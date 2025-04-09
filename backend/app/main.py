from datetime import datetime,timedelta
from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import text, LargeBinary
from pydantic import BaseModel, EmailStr
from typing import Optional
from fastapi.security import HTTPBearer, OAuth2PasswordRequestForm,HTTPAuthorizationCredentials
import logging
from fastapi.middleware.cors import CORSMiddleware
import bcrypt 
from jose import JWTError, jwt
from dotenv import load_dotenv
import os
import time
from urllib.parse import quote_plus

# Local imports
from app.models.user import User
from app.database.session import SessionLocal, engine
from app.models.detection import DetectionResult

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Database connection setup
def get_db_url():
    raw_url = os.getenv("DATABASE_URL")
    if not raw_url:
        raise ValueError("DATABASE_URL environment variable not set")
    
    if "@" in raw_url:
        user_pass, host_db = raw_url.split("@", 1)
        user, password = user_pass.split("//")[1].split(":", 1)
        encoded_password = quote_plus(password)
        return f"postgresql://{user}:{encoded_password}@{host_db}"
    return raw_url

SQLALCHEMY_DATABASE_URL = get_db_url()

def wait_for_db(max_retries=5, delay=3):
    for attempt in range(max_retries):
        try:
            with engine.connect() as conn:
                conn.execute(text("SELECT 1"))
                logger.info("✅ Database connected.")
                return
        except Exception as e:
            logger.warning(f"⏳ Attempt {attempt+1}: Waiting for DB... Error: {str(e)}")
            time.sleep(delay)
    raise RuntimeError("❌ Database unavailable after retries")

wait_for_db()



# Create tables
DetectionResult.metadata.create_all(bind=engine)

app = FastAPI(
    title="Fake News Detector API",
    description="API for detecting fake news content",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class DetectionRequest(BaseModel):
    text: str
    user_id: Optional[int] = None

class DetectionResponse(BaseModel):
    id: int
    created_at: datetime
    result: str
    confidence: float
    processed_text: str

class RegisterRequest(BaseModel):
    username: str
    email: EmailStr
    password: str
    confirmPassword: str

class Token(BaseModel):
    access_token: str
    token_type: str

# Database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    except Exception as e:
        logger.error(f"Database error: {str(e)}")
        db.close()
        raise HTTPException(
            status_code=503,
            detail="Database service unavailable"
        )
    finally:
        db.close()

# Auth configuration
SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY:
    raise ValueError("SECRET_KEY environment variable not set")

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
security = HTTPBearer()

@app.get("/")
async def health_check(db: Session = Depends(get_db)):
    return {
        "status": "API is running",
        "database": "connected",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.post("/register")
async def register_user(register_data: RegisterRequest, db: Session = Depends(get_db)):
    if register_data.password != register_data.confirmPassword:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Passwords do not match"
        )
    
    if db.query(User).filter(User.email == register_data.email).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists"
        )
    
    hashed_password = bcrypt.hashpw(
        register_data.password.encode('utf-8'), 
        bcrypt.gensalt()
    )
    
    user = User(
        username=register_data.username,
        email=register_data.email,
        hashed_password=hashed_password
    )
    
    db.add(user)
    db.commit()
    return {"message": "User registered successfully", "user_id": user.id}

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@app.post("/token", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect credentials")
    
    if not bcrypt.checkpw(
    form_data.password.encode('utf-8'),  # Ensure the password is encoded
    user.hashed_password if isinstance(user.hashed_password, bytes) 
    else user.hashed_password.encode('utf-8')  # Ensure the hashed password is in bytes
):
     raise HTTPException(status_code=400, detail="Incorrect credentials")


    
    return {
        "access_token": create_access_token({"sub": user.email}),
        "token_type": "bearer"
    }

@app.get("/users/me")
async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    try:
        payload = jwt.decode(
            credentials.credentials, 
            SECRET_KEY, 
            algorithms=[ALGORITHM]
        )
        if not (email := payload.get("sub")):
            raise HTTPException(status_code=401, detail="Invalid token")
        
        if not (user := db.query(User).filter(User.email == email).first()):
            raise HTTPException(status_code=404, detail="User not found")
        
        return {
            "username": user.username,
            "email": user.email,
            "id": user.id
        }
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    # main.py


@app.get("/debug-user")
def debug_user(db: Session = Depends(get_db)):
    try:
        user = db.query(User).first()
        raw_value = user.hashed_password

        # Check if it's bytes, then safely decode
        if isinstance(raw_value, bytes):
            decoded_value = raw_value.decode("utf-8", errors="ignore")
        else:
            decoded_value = "Not bytes (it may have been stored as string)"

        return {
            "type": str(type(raw_value)),
            "raw_as_str": str(raw_value),
            "raw_decoded": decoded_value
        }
    except Exception as e:
        return {"error": str(e)}



@app.post("/detect", response_model=DetectionResponse)
async def detect(request: DetectionRequest, db: Session = Depends(get_db)):
    try:
        if not request.text.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Text cannot be empty"
            )

        processed_text = request.text[:500]
        is_fake = "fake" in processed_text.lower()
        record = DetectionResult(
            text=processed_text,
            is_fake=is_fake,
            confidence=0.95 if is_fake else 0.05,
            user_id=request.user_id
        )
        
        db.add(record)
        db.commit()
        db.refresh(record)
        
        return {
            "id": record.id,
            "created_at": record.created_at,
            "result": "FAKE" if is_fake else "REAL",
            "confidence": record.confidence,
            "processed_text": processed_text
        }
    except Exception as e:
        db.rollback()
        logger.error(f"Detection failed: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Detection processing failed"
        )
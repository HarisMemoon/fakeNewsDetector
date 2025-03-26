from datetime import datetime
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database.session import SessionLocal, engine
from app.models.detection import DetectionResult

# Create tables (remove in production)
DetectionResult.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Add this root endpoint
@app.get("/")
def health_check():
    return {"status": "API is running", "database": "connected"}

@app.post("/detect")
async def detect(text: str, db: Session = Depends(get_db)):
    is_fake = "fake" in text.lower()
    confidence = 0.95 if is_fake else 0.05
    
    record = DetectionResult(
        text=text,
        is_fake=is_fake,
        confidence=confidence
    )
    
    db.add(record)
    db.commit()
    db.refresh(record)
    
    return {
        "id": record.id,
        "created_at": record.created_at.isoformat(),
        "result": "FAKE" if is_fake else "REAL",
        "confidence": confidence
    }
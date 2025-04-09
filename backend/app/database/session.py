from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Configuration with enhanced parameters
SQLALCHEMY_DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:5525@db:5432/fake_detector"
    "?connect_timeout=5"
    "&keepalives=1"
    "&keepalives_idle=30"
    "&keepalives_interval=10"
)

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    pool_pre_ping=True,          # Check connections before use
    pool_size=5,                # Maintain 5 connections
    max_overflow=10,            # Allow temporary overflow
    pool_recycle=3600,          # Recycle connections hourly
    connect_args={
        "connect_timeout": 10,  # 10-second timeout
        "keepalives": 1,        # Enable TCP keepalives
        "keepalives_idle": 30,  # Start keepalives after 30s idle
        "keepalives_interval": 10,
        "keepalives_count": 5
    }
)
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    expire_on_commit=False
)

Base = declarative_base()

# Immediate connection test on startup
try:
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
    print("✅ Database connection verified at startup")
except Exception as e:
    print(f"❌ Database connection failed: {str(e)}")
    raise
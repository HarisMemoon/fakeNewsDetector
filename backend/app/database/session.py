from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# MUST match docker-compose.yml POSTGRES_PASSWORD (5525)
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:5525@db:5432/fake_detector?connect_timeout=5"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
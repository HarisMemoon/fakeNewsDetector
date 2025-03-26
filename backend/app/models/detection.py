from sqlalchemy import Column, Integer, String, Boolean, Float, DateTime  # Added DateTime
from sqlalchemy.sql import func  # Added func
from app.database.session import Base  # Make sure this import path is correct

class DetectionResult(Base):
    __tablename__ = "detection_results"
    
    id = Column(Integer, primary_key=True, index=True)
    text = Column(String(500))
    is_fake = Column(Boolean)
    confidence = Column(Float)
    created_at = Column(DateTime(timezone=True), server_default=func.now())  # Now works
from sqlalchemy import Column, Integer, String, Boolean, Float, DateTime
from sqlalchemy.sql import func
from app.database.session import Base  # Make sure this path is correct

class DetectionResult(Base):
    __tablename__ = "detection_results"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String(500), nullable=False)                 # Input text (max 500 chars)
    is_fake = Column(Boolean, nullable=False)                  # Prediction result
    confidence = Column(Float, nullable=False)                 # Confidence score
    user_id = Column(Integer, nullable=True)                   # Optional user reference
    created_at = Column(DateTime(timezone=True),               # Record timestamp
                        server_default=func.now(),
                        nullable=False)

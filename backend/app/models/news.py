from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class NewsAnalysis(Base):
    __tablename__ = "news_analysis"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(String)
    prediction = Column(String)
    confidence = Column(Float)
    sentiment_score = Column(Float)

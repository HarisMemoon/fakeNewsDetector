# Backend — Fake News Detector (FastAPI)

This backend exposes an API to analyze news articles and classify them as Fake/Real using a trained Machine Learning model.

## Technologies:
- FastAPI
- Scikit-learn
- TextBlob
- Joblib (for model storage)

## Running:
```bash
uvicorn app.main:app --reload

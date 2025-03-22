from app.database import get_session
from app.models.news import NewsAnalysis

async def predict_news(text, session):
    prediction = model.predict([text])[0]
    label = "Fake" if prediction == 1 else "Real"
    confidence = float(model.predict_proba([text])[0].max())
    sentiment = TextBlob(text).sentiment.polarity

    # Save to DB
    news_entry = NewsAnalysis(
        content=text,
        prediction=label,
        confidence=confidence,
        sentiment_score=sentiment
    )
    session.add(news_entry)
    await session.commit()

    return {
        "prediction": label,
        "confidence": confidence,
        "sentiment_score": sentiment
    }

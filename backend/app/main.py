from app.database import get_session
from fastapi import Depends

@app.post("/analyze")
async def analyze_news(request: AnalyzeRequest, session=Depends(get_session)):
    result = await predict_news(request.content, session)
    return result

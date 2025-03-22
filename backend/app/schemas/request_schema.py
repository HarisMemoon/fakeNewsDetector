from pydantic import BaseModel

class NewsInput(BaseModel):
    content: str

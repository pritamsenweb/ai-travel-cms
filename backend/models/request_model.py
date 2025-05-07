from pydantic import BaseModel

class TravelRequest(BaseModel):
    destination: str
    days: int
    preferences: str
    budget: str

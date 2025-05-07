from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models.request_model import TravelRequest
from langchain_modules.itinerary_generator import generate_itinerary

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate-itinerary")
def create_plan(request: TravelRequest):
    result = generate_itinerary(request.destination, request.days, request.preferences, request.budget)
    return {"itinerary": result}

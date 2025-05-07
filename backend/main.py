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

@app.get("/")
def read_root():
    return {"message": "Welcome to the AI Travel App API!"}

@app.get("/favicon.ico")
def favicon():
    return {"message": "Favicon not available"}

@app.post("/generate-itinerary")
def create_plan(request: TravelRequest):
    result = generate_itinerary(request.destination, request.days, request.preferences, request.budget)
    return {"itinerary": result}
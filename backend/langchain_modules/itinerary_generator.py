from langchain_community.llms import OpenAI
from langchain.prompts import PromptTemplate
import os

def generate_itinerary(destination, days, preferences, budget):
    llm = OpenAI(openai_api_key=os.getenv("OPENAI_API_KEY"), temperature=0.7)

    prompt = PromptTemplate.from_template(
        "Generate a {days}-day travel itinerary for {destination} focused on {preferences} within a budget of {budget}."
    )
    final_prompt = prompt.format(destination=destination, days=days, preferences=preferences, budget=budget)

    return llm(final_prompt)

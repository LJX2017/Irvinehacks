# main.py (FastAPI)
import random
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

class Item(BaseModel):
    description: str

class Message(BaseModel):
    type: str
    message: str
    fromUser: bool

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/backend")
async def receive_frontend(item: Item):
    response = send_message(item.description)
    return {"message": response}

@app.post("/sendMessage")
async def receive_json_from_frontend(json_data: Message):
    response = generate_json_response(json_data)
    return response

def send_message(message: str) -> str:
    # Generate a random response
    responses = ["Hello!", "How are you?", "Nice to meet you!"]
    random_response = random.choice(responses)
    return random_response

def generate_json_response(json_data: Message) -> dict:
    # Process the JSON data received from the front end
    # and generate a response JSON
    response = {
        "status": "success",
        "message": f"{json_data.message}",
        "data": json_data.dict(),
    }
    return response

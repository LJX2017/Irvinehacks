# main.py (FastAPI)
import random
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi import HTTPException, Form
from character import Character
import io
import json
import whisper
# this is the open-ai whisper model
# pip install openai-whisper 
# sudo apt-get install ffmpeg



class Item(BaseModel):
    description: str

class Message(BaseModel):
    message: str

app = FastAPI()
character = None

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
character = None
@app.post("/backend")
async def receive_frontend(item: Item):
    global character
    character = Character(item.description)
    response = send_message(item.description)
    return {"message": response}

@app.post("/sendMessage")
async def receive_json_from_frontend(json_data: Message):
    global character
    return generate_json_response(character.chat(json_data.message))
    # response = generate_json_response(json_data)
    # returnn response

def send_message(message: str) -> str:
    # Generate a random response
    responses = ["Hello!", "How are you?", "Nice to meet you!"]
    random_response = random.choice(responses)
    return random_response

def generate_json_response(json_data: str) -> dict:
    # Process the JSON data received from the front end
    # and generate a response JSON
    response = {
        "message": f"{json_data}"
    }
    return response
    
@app.post("/voice") 
async def convert_audio_to_text(audio_blob: dict):
    # return {"text": "Yo, I'm Peter Quill, also known as Star-Lord. I'm a legendary outlaw who travels the galaxy in search of adventure and fortune. I'm known for my reckless and irresponsible behavior, but I'm also loyal to my friends and always up for a good time."}
    try:
        # Extract the audio content (adjust the key according to your JSON structure)
        audio_content = audio_blob.get("audio")
        if not audio_content:
            raise HTTPException(status_code=422, detail="Invalid audio data format")

        # Load the Whisper model
        model = whisper.load_model("tiny.en")

        global character
        # Transcribe the audio content
        result = model.transcribe(audio_content)

        return {"text": character.chat(result["text"])}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

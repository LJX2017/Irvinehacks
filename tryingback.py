# main.py (FastAPI)
import random
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi import HTTPException, Form
import io
import json
import whisper
import character as charac
# this is the open-ai whisper model
# pip install openai-whisper 
# sudo apt-get install ffmpeg



class Config(BaseModel):
    description: str

class Message(BaseModel):
    message: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

current_character = None
@app.post("/config/")
async def receive_config_frontend(config_prompt: Config):
    """Listens on http://127.0.0.1:8000/config/ for a POST request from front-end, then sets up the character and returns a placeholder json"""
    global current_character
    current_character = charac.Character(config_prompt)
    return {"message": None}

@app.post("/genMessage/")
async def receive_message_from_frontend(message_prompt: Message):
    """Listens on http://127.0.0.1:8000/genMessage/ for a POST request from front-end, then returns the character's response from back-end as a json"""
    global current_character
    response = {"message": f"{current_character.chat(message_prompt.message)}"}
    return response
    
@app.post("/voice/") 
async def convert_audio_to_text(audio_blob: dict):
    try:
        # Extract the audio content (adjust the key according to your JSON structure)
        audio_content = audio_blob.get("audio")
        if not audio_content:
            raise HTTPException(status_code=422, detail="Invalid audio data format")

        # Load the Whisper model
        model = whisper.load_model("tiny.en")

        # Transcribe the audio content
        result = model.transcribe(audio_content)
        
        return {"text": result["text"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

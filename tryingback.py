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
# pip install fastapi

class Config(BaseModel):
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
@app.post("/backend")
async def receive_config(config_prompts: Config):
    """Listens for POST request on http://127.0.0.1:8000/backend from front-end, then creates a character and returns a placeholder JSON"""
    global character
    character = Character(config_prompts.description)
    return {"message": "response"}


@app.post("/sendMessage")
async def receive_text_json(msg_prompt: Message):
    """Listen for POST request on http://127.0.0.1:8000/sendMessage from front-end containing string prompt, then responds with a JSON containing the response message"""
    global character
    return {"message": f"{character.chat(msg_prompt.message)}"}
    
@app.post("/voice") 
async def receive_audio_json(audio_blob: dict):
    """Listen for POST request on http://127.0.0.1:8000/voice from front-end containing audio prompt, then responds with a JSON containing the response message"""
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
# FastAPI Code (main.py)
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

class Item(BaseModel):
    description: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/backend")  # Change from @app.get to @app.post
async def receive_frontend(item: Item):
    print(item.description)
    return {"message": "received"}

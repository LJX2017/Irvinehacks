import requests

CHUNK_SIZE = 1024
url = "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM"
# the 21m00Tcm4TlvDq8ikWAM is the person of the model
# it has labels like american and stuff like that if we want to pick from different moods of people or different accents

headers = {
  "Accept": "audio/mpeg",
  "Content-Type": "application/json",
  "xi-api-key": ""
#   this is my api key for now please dont 
}

data = {
  "text": "Born and raised in the charming south, I can add a touch of sweet southern hospitality to your audiobooks and podcasts",
  "model_id": "eleven_turbo_v2",
  "voice_settings": {
    "stability": 0.5,
    "similarity_boost": 0.5
  }
}

response = requests.post(url, json=data, headers=headers)
with open('output.mp3', 'wb') as f:
    for chunk in response.iter_content(chunk_size=CHUNK_SIZE):
        if chunk:
            f.write(chunk)

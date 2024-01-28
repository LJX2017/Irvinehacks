import requests

CHUNK_SIZE = 1024
headers = {
    "Accept": "audio/mpeg",
    "Content-Type": "application/json",
    "xi-api-key": ""
    #   this is my api key for now please dont 
    }

def generate_audio_file(voice_id: str, prompt: str):
    """Takes voice_id and text of what you want the voice to say, then generates an audio_output.mp3 file within the local folder"""
    url = "https://api.elevenlabs.io/v1/text-to-speech/" + voice_id
    # the 21m00Tcm4TlvDq8ikWAM is the person of the model (list of voice_ids can be found at https://api.elevenlabs.io/v1/voices)
    # it has labels like american and stuff like that if we want to pick from different moods of people or different accents

    data = {
    "text": prompt,
    "voice_settings": {
        "stability": 0.5,
        "similarity_boost": 0.5
    }
    }

    response = requests.post(url, json=data, headers=headers)
    with open('audio_output.mp3', 'wb') as f:
        for chunk in response.iter_content(chunk_size=CHUNK_SIZE):
            if chunk:
                f.write(chunk)

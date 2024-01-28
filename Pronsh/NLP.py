import whisper
# this is the open-ai whisper model
# pip install openai-whisper 
# sudo apt-get install ffmpeg
import time
# Activation word YOOOOOOO
def transcribe(audio_file):
    model = whisper.load_model("medium.en")
    result = model.transcribe(audio_file)
    return result["text"]

if __name__ == "__main__":    
    start_time = time.time()
    model = whisper.load_model("medium.en")
    result = model.transcribe("EarningsCall.wav")
    with open("transcription.txt", "w") as f:
        f.write(result["text"])
    end_time = time.time()
    execution_time = end_time - start_time
    print(f"The code executed in {execution_time} seconds")

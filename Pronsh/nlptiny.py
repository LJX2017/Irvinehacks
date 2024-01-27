import whisper
# this is the open-ai whisper model
# pip install openai-whisper 
# sudo apt-get install ffmpeg
import time

start_time = time.time()


model = whisper.load_model("tiny.en")
result = model.transcribe("EarningsCall.wav")

# Example usage
with open("transcript2.txt", "w") as f:
    f.write(result["text"])
end_time = time.time()

execution_time = end_time - start_time
print(f"The code executed in {execution_time} seconds")

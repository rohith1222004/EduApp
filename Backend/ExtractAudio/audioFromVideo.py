import openai
import os
from moviepy.editor import VideoFileClip
from langchain.text_splitter import RecursiveCharacterTextSplitter


openai.api_key = "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"


def extractAudio(video_file_path):
    video_clip = VideoFileClip(video_file_path)

    audio_clip = video_clip.audio

    audio_clip.write_audiofile("audios/" + "audio1.m4a", codec='aac')


def createTranscriptionWithSplits():
    audio_file = open(os.path.abspath("audios/audio1.m4a"),
                      "rb")

    transcript = openai.Audio.transcribe("whisper-1", audio_file)

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1500, chunk_overlap=150)

    splits = text_splitter.split_text(transcript['text'])

    return splits

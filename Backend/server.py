import os
import ExtractAudio.audioFromVideo as ExtractAudio
import CreateEmbeddings.createTextEmbeddings as CreateEmbeddings
import time

from flask import Flask, jsonify, Response
from flask import request, jsonify
from flask_cors import CORS
from pytube import YouTube
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA
import json


app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Allowed video file extensions
ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mkv', 'mov', 'wmv'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/uploadVideoFile", methods=["POST"])
def OfflineVideoUpload():
    # global vectorDB
    # if 'video' not in request.files:
    #     return jsonify({"message": "video file not found"})

    # video_file = request.files['video']

    # if video_file.filename == '':
    #     return jsonify({"message": "An upload error occurred, File has no name"})

    # if video_file and allowed_file(video_file.filename):
    #     video_path = os.path.join(
    #         app.config['UPLOAD_FOLDER'], video_file.filename)
    #     video_file.save(video_path)

    #     ExtractAudio.extractAudio(video_path)

    #     video_transcript_splits = ExtractAudio.createTranscriptionWithSplits()
    #     vectorDB = CreateEmbeddings.createEmbeddingsVector(
    #         video_transcript_splits)

    #     return jsonify({"status": "success"})

    return jsonify({'message':  'Invalid file format. Only video files are allowed.'})


@app.route("/uploadLink", methods=["POST"])
def upload():
    global ytvectorDB
    url = request.json.get('url')
    VIDEO_SAVE_PATH = "uploads/"
    AUDIO_SAVE_PATH = "audios/"

    try:
        yt = YouTube(url)
    except:
        return jsonify({"message": "Invalid youtube URL"})

    audio_stream = yt.streams.filter(only_audio=True).first()

    audio_stream.download(AUDIO_SAVE_PATH, filename="audio1.m4a")

    try:
        audio_stream.download(VIDEO_SAVE_PATH)
    except Exception:
        return jsonify({"message": "An error occurred while downloading the video in the server"})

    video_transcript_splits = ExtractAudio.createTranscriptionWithSplits()
    ytvectorDB = CreateEmbeddings.createEmbeddingsVector(
        video_transcript_splits)
    return jsonify({"status": "success"})


@app.route("/askVideoFileQuery", methods=["POST"])
def VideoFileQuery():
    message = request.json.get('message')

    global qa_chain

    qa_chain = RetrievalQA.from_chain_type(
        llm=ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0),
        chain_type="stuff",
        retriever=vectorDB.as_retriever(),
    )

    ans = qa_chain.run(message)

    def generate():
        for char in ans['answer']:
            time.sleep(0.05)
            yield f"data: {char}\n\n"

    return Response(generate(), content_type="text/event-stream")


@app.route("/askYTVideoQuery", methods=["POST"])
def YTVideoQuery():
    message = request.json.get('message')

    global qa_chain

    qa_chain = RetrievalQA.from_chain_type(
        llm=ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0),
        chain_type="stuff",
        retriever=ytvectorDB.as_retriever(),
    )

    ans = qa_chain.run(message)

    def generate():
        for char in ans['answer']:
            time.sleep(0.05)
            yield f"data: {char}\n\n"
    return jsonify(ans)


@app.route("/pdf", methods=["POST"])
def pdf():
    pdf = "give me the formula alone."
    pdfGeneration = qa_chain.run(pdf)
    pdfFormated = pdfGeneration.replace("\n", "<br>")
    return jsonify(pdfFormated)


@app.route("/quiz", methods=["POST"])
def quiz():
    quiz = 'give me 3 multiple choice question using provided context in json array format.The json format should be like this[{"question" :"","options":[{"opt1":"","opt2":"",...}],"answer":"<correct-answer>"},{"question" :"","options":[{"opt1":"","opt2":"",...}],"answer":"<correct-answer>"}...]'
    qa_chain = RetrievalQA.from_chain_type(
        llm=ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0),
        chain_type="stuff",
        retriever=ytvectorDB.as_retriever(),
    )

    quizquestion = qa_chain.run(quiz)
    print(quizquestion)
    questionjson = json.loads(quizquestion)
    return jsonify(questionjson)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)

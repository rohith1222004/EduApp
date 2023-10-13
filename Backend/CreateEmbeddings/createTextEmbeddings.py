import os
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS

os.environ["OPENAI_API_KEY"] = "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"

embeddings = OpenAIEmbeddings()


def createEmbeddingsVector(splits):
    return FAISS.from_texts(splits, embeddings)

import os
# from langchain.embeddings import OpenAIEmbeddings
# from langchain.vectorstores import FAISS
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Bagel



os.environ["OPENAI_API_KEY"] = "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"

embeddings = OpenAIEmbeddings()


def createEmbeddingsVector(splits):
    # db = FAISS.from_texts(splits, embeddings)
    db = Bagel.from_texts(cluster_name="testing", texts=splits)
    print(db)
    return db

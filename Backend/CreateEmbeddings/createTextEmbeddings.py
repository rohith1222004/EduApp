import os
# from langchain.embeddings import OpenAIEmbeddings
# from langchain.vectorstores import FAISS
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
# from langchain_community.vectorstores import Bagel
from langchain.vectorstores import LanceDB



os.environ["OPENAI_API_KEY"] = "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"

embeddings = OpenAIEmbeddings()


def createEmbeddingsVector(splits):
    # db = FAISS.from_texts(splits, embeddings)
    # db = Bagel.from_texts(cluster_name="testing", texts=splits)
    # db.delete_cluster('testing')
    db = LanceDB.from_texts(splits, embeddings)
    # print(db)
    return db


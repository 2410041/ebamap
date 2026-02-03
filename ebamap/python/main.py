from fastapi import FastAPI
import mysql.connector

app = FastAPI()


def get_connection():
    return mysql.connector.connect(
        # docker-compose の service 名
        host="db",
        user="root",
        password="root",
        database="ebamap",
    )


@app.get("/")
def root():
    return {"message": "Python API running 🐍"}


@app.get("/calc")
def calc():
    return {"result": 42}


@app.get("/stores")
def get_stores():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM stores")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows

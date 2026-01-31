from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Python API running 🐍"}

@app.get("/calc")
def calc():
    return {"result": 42}

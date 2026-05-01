
from fastapi import FastAPI
from routes import analyze, admin

app = FastAPI()

app.include_router(analyze.router)
app.include_router(admin.router)

@app.get("/")
def root():
    return {"message": "AI Resume Analyzer API running"}

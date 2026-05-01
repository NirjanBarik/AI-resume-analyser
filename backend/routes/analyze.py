
from fastapi import APIRouter, UploadFile, Form
from db import resumes

router = APIRouter()

@router.post("/analyze")
async def analyze(file: UploadFile, job_desc: str = Form(...)):
    text = (await file.read()).decode(errors="ignore")
    score = len(text) % 100

    data = {"score": score, "skills": ["python"], "missing": ["ml"]}
    resumes.insert_one(data)
    return data

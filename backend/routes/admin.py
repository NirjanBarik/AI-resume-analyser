
from fastapi import APIRouter
from db import resumes

router = APIRouter(prefix="/admin")

@router.get("/stats")
def stats():
    total = resumes.count_documents({})
    return {"total_resumes": total}

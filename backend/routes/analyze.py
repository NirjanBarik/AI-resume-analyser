import re
from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, Form
from pydantic import BaseModel
from db import resumes_collection
from routes.auth import get_current_user
from datetime import datetime
from pdfminer.high_level import extract_text
import io

router = APIRouter(prefix="/analyze", tags=["analyze"])

class TextAnalyzeRequest(BaseModel):
    resume_text: str
    job_description: str

TECH_SKILLS = ["python", "java", "react", "node", "sql", "mongodb", "aws", "docker", "machine learning", "kubernetes", "javascript", "typescript", "c++", "c#", "fastapi", "express", "django", "spring", "flask"]
SOFT_SKILLS = ["communication", "leadership", "teamwork", "problem solving", "time management", "critical thinking", "adaptability", "management", "collaboration"]

COURSE_RECOMMENDATIONS = {
    "python": "https://www.coursera.org/specializations/python",
    "react": "https://react.dev/learn",
    "node": "https://nodejs.dev/learn",
    "aws": "https://aws.amazon.com/training/",
    "docker": "https://docs.docker.com/get-started/",
    "sql": "https://www.w3schools.com/sql/",
    "mongodb": "https://learn.mongodb.com/",
    "java": "https://dev.java/learn/",
    "javascript": "https://javascript.info/",
    "typescript": "https://www.typescriptlang.org/docs/",
    "machine learning": "https://www.coursera.org/learn/machine-learning",
    "fastapi": "https://fastapi.tiangolo.com/",
}

STOP_WORDS = set(["the", "and", "to", "a", "of", "in", "for", "is", "on", "that", "by", "this", "with", "i", "you", "it", "not", "or", "be", "are", "from", "at", "as", "your", "all", "have", "new", "more", "an", "was", "we", "will", "home", "can", "us", "about", "if", "page", "my", "has", "search", "free", "but", "our", "one", "other", "do", "no", "information", "time", "they", "site", "he", "up", "may", "what", "which", "their", "news", "out", "use", "any", "there", "see", "only", "so", "his", "when", "contact", "here", "business", "who", "web", "also", "now", "help", "get", "pm", "view", "online", "c", "e", "first", "am", "been", "would", "how", "were", "me", "s", "services", "some", "these", "click", "its", "like", "service", "x", "than", "find", "price", "date", "back", "top", "people", "had", "list", "name", "just", "over", "state", "year", "day", "into", "email", "two", "health", "n", "world", "re", "next", "used", "go", "b", "work", "last", "most", "products", "music", "buy", "data", "make", "them", "should", "product", "system", "post", "her", "city", "t", "add", "policy", "number", "such", "please", "available", "copyright", "support", "message", "after", "best", "software", "then", "jan", "good", "video", "well", "d", "where", "info", "rights", "public", "books", "high", "school", "through", "m", "each", "links", "she", "review", "years", "order", "very", "privacy", "book", "items", "company", "read", "group", "sex", "need", "many", "user", "said", "de", "does", "set", "under", "general", "research", "university", "january", "mail", "full", "map", "reviews", "program", "life"])

def get_word_frequencies(text: str):
    words = re.findall(r'\b[a-z]{3,}\b', text.lower())
    freq = {}
    for w in words:
        if w not in STOP_WORDS:
            freq[w] = freq.get(w, 0) + 1
    # Return top 50 words to avoid massive payloads
    sorted_words = sorted(freq.items(), key=lambda x: x[1], reverse=True)[:50]
    return [{"text": w, "value": count} for w, count in sorted_words]


def analyze_resume_logic(resume_text: str, jd_text: str, user_id: str):
    resume_lower = resume_text.lower()
    jd_lower = jd_text.lower()
    
    # Extract skills from JD
    jd_skills = [s for s in TECH_SKILLS + SOFT_SKILLS if s in jd_lower]
    if not jd_skills:
        jd_skills = ["python", "react", "sql"] # fallback if jd has none
        
    matched_skills = []
    missing_skills = []
    for s in jd_skills:
        if s in resume_lower:
            matched_skills.append(s)
        else:
            missing_skills.append(s)
            
    # Extra skills (in resume but not in JD)
    extra_skills = [s for s in TECH_SKILLS + SOFT_SKILLS if s in resume_lower and s not in jd_skills]
    
    # Calculate scores
    total_jd = len(jd_skills)
    match_pct = len(matched_skills) / total_jd if total_jd > 0 else 0
    score = int(match_pct * 100)
    
    tech_jd = [s for s in jd_skills if s in TECH_SKILLS]
    tech_matched = [s for s in matched_skills if s in TECH_SKILLS]
    tech_score = int(len(tech_matched) / len(tech_jd) * 100) if tech_jd else 100
    
    soft_jd = [s for s in jd_skills if s in SOFT_SKILLS]
    soft_matched = [s for s in matched_skills if s in SOFT_SKILLS]
    soft_score = int(len(soft_matched) / len(soft_jd) * 100) if soft_jd else 100
    
    # Experience years simple regex
    exp_matches = re.findall(r'(\d+)\+?\s*(?:years?|yrs?)(?:\s*of)?\s*experience', resume_lower)
    exp_years = max([int(m) for m in exp_matches]) if exp_matches else 0
    
    # Contact email extraction
    email_match = re.search(r'[\w\.-]+@[\w\.-]+\.\w+', resume_text)
    email = email_match.group(0) if email_match else None
    
    # ATS Formatting Heuristics
    ats_sections = ["experience", "education", "skills", "projects"]
    found_sections = [sec for sec in ats_sections if sec in resume_lower]
    has_contact = email is not None
    ats_score = int((len(found_sections) + (1 if has_contact else 0)) / (len(ats_sections) + 1) * 100)
    
    # Word Frequencies for Word Cloud
    resume_words = get_word_frequencies(resume_text)
    jd_words = get_word_frequencies(jd_text)
    
    # Upskilling Recommendations
    recommended_courses = []
    for ms in missing_skills:
        if ms in COURSE_RECOMMENDATIONS:
            recommended_courses.append({
                "skill": ms,
                "course_url": COURSE_RECOMMENDATIONS[ms]
            })

    result = {
        "user_id": user_id,
        "score": score,
        "tech_score": tech_score,
        "soft_score": soft_score,
        "ats_score": ats_score,
        "experience_years": exp_years,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "extra_skills": extra_skills,
        "recommended_courses": recommended_courses,
        "resume_word_cloud": resume_words,
        "jd_word_cloud": jd_words,
        "contact": {"email": email},
        "created_at": datetime.utcnow()
    }
    
    # Save to db
    inserted = resumes_collection.insert_one(result)
    result["_id"] = str(inserted.inserted_id)
    return result

@router.post("/text")
def analyze_text(data: TextAnalyzeRequest, user=Depends(get_current_user)):
    return analyze_resume_logic(data.resume_text, data.job_description, user["sub"])

@router.post("/upload")
def analyze_upload(job_description: str = Form(...), file: UploadFile = File(...), user=Depends(get_current_user)):
    if not file.filename.endswith(".pdf") and not file.filename.endswith(".txt"):
        raise HTTPException(status_code=400, detail="Only PDF and TXT files are supported")
        
    try:
        contents = file.file.read()
        if file.filename.endswith(".pdf"):
            resume_text = extract_text(io.BytesIO(contents))
        else:
            resume_text = contents.decode("utf-8")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading file: {str(e)}")
        
    return analyze_resume_logic(resume_text, job_description, user["sub"])

@router.get("/history")
def get_history(user=Depends(get_current_user)):
    history = list(resumes_collection.find({"user_id": user["sub"]}).sort("created_at", -1).limit(20))
    for h in history:
        h["_id"] = str(h["_id"])
        h["created_at"] = h["created_at"].isoformat()
    return history

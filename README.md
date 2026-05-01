# 🧠 AI Resume Analyzer 

## 📌 Overview

AI Resume Analyzer is a full-stack web application that evaluates resumes against job descriptions using Natural Language Processing (NLP). It helps candidates improve their resumes and assists recruiters with data-driven insights.

---

## 🚀 Features

### 👤 User Side

* Upload Resume (PDF)
* Enter Job Description
* Resume Score Calculation
* Skill Extraction
* Missing Skill Identification
* AI-based Feedback

### 👨‍💼 Admin Panel

* View total users and resumes
* Average resume score
* Skill demand analytics
* Resume score distribution

---

## 🏗️ Tech Stack

### 🔹 Backend

* FastAPI (Python)
* MongoDB (Database)

### 🔹 Frontend

* React.js

### 🔹 AI/NLP

* Basic text analysis (extendable to advanced models like BERT)

---

## 📁 Project Structure

```
ai_resume_analyzer/
│
├── backend/
│   ├── main.py
│   ├── db.py
│   ├── routes/
│
├── frontend/
│   ├── src/
│   ├── package.json
│
├── README.md
```

---

## ⚙️ Installation & Setup

### 🔹 1. Clone Repository

```
git clone <your-repo-link>
cd ai_resume_analyzer
```

---

### 🔹 2. Backend Setup

```
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend will run at:

```
http://localhost:8000
```

API Docs:

```
http://localhost:8000/docs
```

---

### 🔹 3. Frontend Setup

```
cd frontend
npm install
npm start
```

Frontend will run at:

```
http://localhost:3000
```

---

## 🌐 Deployment

### Backend

* Deploy using platforms like Render
* Start command:

```
uvicorn main:app --host 0.0.0.0 --port 10000
```

### Frontend

* Deploy using Vercel or Netlify

---

## 🔗 API Endpoints

### Analyze Resume

```
POST /analyze
```

### Admin Stats

```
GET /admin/stats
```

---

## 📊 Sample Output

```json
{
  "score": 78,
  "skills": ["python", "sql"],
  "missing": ["machine learning"],
  "feedback": ["Moderate match. Improve skill coverage."]
}
```

---

## ⚠️ Limitations

* Basic scoring logic (can be improved with AI models)
* No authentication (can be extended with JWT)
* Limited skill database

---

## 🔥 Future Enhancements

* Integration with advanced NLP models
* Resume ranking system
* User authentication (JWT)
* Advanced analytics dashboard
* GPT-based feedback system

---

## 🎓 Use Case

* Final year academic project
* Resume screening tool prototype
* HR analytics system

---

## 👨‍💻 Author

Nirjan Barik

---

## 📜 License

This project is for educational purposes.


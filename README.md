<div align="center">
  <h1>⚡ AI Resume Analyzer</h1>
  <p>A full-stack, AI-powered application that parses resumes and evaluates them against job descriptions using Natural Language Processing (NLP).</p>

  <!-- Badges -->
  <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" alt="FastAPI" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
</div>

<br />

## 🌟 Overview

The **AI Resume Analyzer** helps recruiters and job seekers evaluate how well a resume matches a target job description. By leveraging semantic text extraction and NLP logic, it provides an instant match score, identifies critical missing skills, and stores historical analysis data for future reference.

## 🚀 Key Features

- **🔐 Secure Authentication:** JWT-based user registration and login.
- **📄 Smart Parsing:** Upload PDF resumes or paste text directly. Uses `pdfminer.six` for robust text extraction.
- **🧠 NLP Skill Extraction:** Automatically detects Technical Skills, Soft Skills, and Years of Experience.
- **📊 Comprehensive Scoring:** Calculates an Overall Match Score, Technical Score, and Soft Skill Score based on the job description requirements.
- **🔍 Gap Analysis:** Clearly outlines Matched Skills, Missing Skills (required by JD but absent in resume), and Extra Skills.
- **📈 Admin Dashboard:** Track global system usage, score distributions, and global skill demand analytics.
- **📜 History Tracking:** Automatically saves all past analyses for logged-in users.

---

## 🛠️ Technology Stack

**Frontend:**
- [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- Vanilla CSS (Glassmorphism & Modern Dashboard UI)

**Backend:**
- [Python 3](https://www.python.org/) + [FastAPI](https://fastapi.tiangolo.com/)
- [PyJWT](https://pyjwt.readthedocs.io/en/latest/) for authentication
- `pdfminer.six` for PDF data extraction

**Database:**
- [MongoDB](https://www.mongodb.com/) (Motor/PyMongo)

---

## ⚙️ Local Development Setup

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.9 or higher)
- A MongoDB cluster (e.g., MongoDB Atlas free tier)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/ai-resume-analyzer.git
cd ai-resume-analyzer
```

### 2. Backend Setup
Navigate to the `backend` directory, install dependencies, and start the FastAPI server:

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt

# Set your MongoDB URI environment variable
# Windows PowerShell: $env:MONGODB_URI="your-mongo-uri"
# Mac/Linux: export MONGODB_URI="your-mongo-uri"

uvicorn main:app --reload --port 8000
```
*The API will be available at `http://localhost:8000` and Swagger docs at `http://localhost:8000/docs`.*

### 3. Frontend Setup
Navigate to the `frontend` directory, install dependencies, and start the Vite development server:

```bash
cd frontend
npm install
npm run dev
```
*The frontend application will be available at `http://localhost:5173`.*

---

## 🌍 Deployment Guide

This project is optimized to be deployed across modern cloud providers.

### Deploying the Backend (Render / Railway)
1. Create a new Web Service on Render.
2. Set the Root Directory to `backend`.
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add your `MONGODB_URI` to the Environment Variables.

### Deploying the Frontend (Vercel / Netlify)
1. Create a new project on Vercel.
2. Set the Root Directory to `frontend`.
3. Add an Environment Variable named `VITE_API_URL` and set it to your deployed Backend URL (e.g., `https://my-backend.onrender.com`).
4. Click Deploy. Vercel will automatically detect the Vite framework and build the project.

---

## 🔗 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/auth/register` | Register a new user account | No |
| `POST` | `/auth/login` | Authenticate and receive JWT | No |
| `POST` | `/analyze/text` | Analyze raw resume text against a JD | Yes |
| `POST` | `/analyze/upload` | Upload a PDF resume to analyze against a JD | Yes |
| `GET`  | `/analyze/history` | Retrieve user's past resume analyses | Yes |
| `GET`  | `/admin/stats` | Retrieve global application statistics | Admin |
| `GET`  | `/admin/skill-demand`| Retrieve top matched and missing skills | Admin |

---

## 👨‍💻 Author

Created by **Nirjan Barik**

---

## 📜 License

This project is for educational purposes

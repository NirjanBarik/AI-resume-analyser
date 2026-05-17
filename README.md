<div align="center">
  <h1>⚡ AI Resume Analyzer</h1>
  <p>A high-performance, full-stack AI-powered application that parses resumes and evaluates them against job descriptions using advanced Natural Language Processing (NLP) models.</p>

  <!-- Badges -->
  <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
</div>

<br />

---

## 🌟 Overview

The **AI Resume Analyzer** is designed to bridge the gap between job seekers and Applicant Tracking Systems (ATS). By leveraging semantic text extraction and intelligent NLP parser models, it evaluates resumes against any target job description. The system instantly generates an overall match score, identifies technical/soft skill gaps, highlights strengths, and maintains a historical analysis dashboard.

The application has been completely redesigned with a gorgeous, modern **Teal & Cyan color palette** that looks incredibly premium in both light and dark modes.

---

## 🚀 Key Features

- **🔐 Secure User Portal:** Complete JWT-based registration, login, and secure session management.
- **📄 High-Fidelity Parsing:** Direct PDF resume uploads or raw text pasting. Uses `pdfminer.six` for robust, structure-aware text extraction.
- **🧠 Intelligent Skill Detection:** Automatically detects technical skills, soft skills, and filters professional years of experience using modern NLP parsing logic.
- **📊 Granular Analytics:** Breaks down your analysis into an Overall Match Score, Technical Skill Score, and Soft Skill Score.
- **🔍 Strategic Gap Analysis:** Lists matching skills, alerts you to missing skills requested in the job description, and marks extra strengths.
- **📈 Global System Analytics:** Admin dashboard offering aggregate metrics on user signups, analysis counts, score distributions, and global skill demand analytics.
- **📜 History Tracking:** Saves and displays past analyses with instant modal-based detail retrieval.
- **🎨 Premium Responsive UI:** Beautiful interactive states, sleek card designs, custom score gauges, and a rich, tailored Teal theme with robust light/dark mode support.

---

## 🛠️ Technology Stack

**Frontend:**
- **Core:** [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling:** Custom Vanilla CSS (featuring HSL variables, sleek dark mode integration, glassmorphic navigations, custom progress indicators, and custom SVG animations)

**Backend:**
- **Engine:** [Python 3](https://www.python.org/) + [FastAPI](https://fastapi.tiangolo.com/) (Asynchronous endpoints for rapid throughput)
- **Security:** Asymmetric [PyJWT](https://pyjwt.readthedocs.io/) token authorization
- **Parsing:** `pdfminer.six` semantic text mining engine

**Database:**
- **Storage:** [MongoDB](https://www.mongodb.com/) (Motor asynchronous driver for seamless non-blocking operations)

---

## ⚙️ Local Development Setup

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.9 or higher)
- MongoDB Cluster (local or MongoDB Atlas free tier)

### 1. Clone the repository
```bash
git clone https://github.com/NirjanBarik/ai-resume-analyzer.git
cd ai-resume-analyzer
```

### 2. Backend Setup
Navigate to the `backend` directory, activate a virtual environment, install packages, and start FastAPI:

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt

# Set your MongoDB URI environment variable
# Windows PowerShell:
$env:MONGODB_URI="your-mongodb-atlas-connection-string"
# Mac/Linux:
export MONGODB_URI="your-mongodb-atlas-connection-string"

uvicorn main:app --reload --port 8000
```
*The interactive Swagger API documentation will be live at `http://localhost:8000/docs`.*

### 3. Frontend Setup
Navigate to the `frontend` directory, install assets, and launch the Vite server:

```bash
cd ../frontend
npm install
npm run dev
```
*The Web UI will be accessible at `http://localhost:5173`.*

---

## 🌍 Production Deployment Guide

This workspace is fully optimized for containerless cloud deployment.

### Backend (Render / Railway)
1. Set up a Web Service on Render pointing to your repository.
2. Set **Root Directory** to `backend`.
3. **Build Command**: `pip install -r requirements.txt`
4. **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Configure `MONGODB_URI` inside your service Environment Variables.

### Frontend (Vercel / Netlify)
1. Import the repository into Vercel.
2. Set **Root Directory** to `frontend`.
3. Add a `VITE_API_URL` environment variable pointing to your live backend endpoint.
4. Click **Deploy**. Vercel will automatically configure the build output and host the static assets.

---

## 🔗 Key API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/auth/register` | Register a new developer account | Public |
| `POST` | `/auth/login` | Authenticate and retrieve JWT session | Public |
| `POST` | `/analyze/text` | Analyze pasted resume text against job description | JWT |
| `POST` | `/analyze/upload` | Upload PDF/TXT resume and analyze against job description | JWT |
| `GET`  | `/analyze/history` | Retrieve user's previous resume analyses | JWT |
| `GET`  | `/admin/stats` | Access general analytics and system overview | Admin |
| `GET`  | `/admin/skill-demand`| Access top demanded skills across all uploads | Admin |

---

## 👨‍💻 Author

Developed with ❤️ by **Nirjan Barik**
- **GitHub**: [@NirjanBarik](https://github.com/NirjanBarik)
- **LinkedIn**: [Nirjan Barik](https://linkedin.com/in/nirjan-barik)

---

## 📜 License

This project is for educational and portfolio presentation purposes.

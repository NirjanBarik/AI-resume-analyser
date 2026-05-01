
from pymongo import MongoClient
client = MongoClient("YOUR_MONGODB_URI")
db = client["resume_analyzer"]

users = db["users"]
resumes = db["resumes"]

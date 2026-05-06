import os
from pymongo import MongoClient
from urllib.parse import quote_plus, urlparse, urlunparse

def build_mongo_uri():
    raw = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
    parsed = urlparse(raw)
    # Only re-encode if there are credentials present
    if parsed.username and parsed.password:
        username = quote_plus(parsed.username)
        password = quote_plus(parsed.password)
        # Reconstruct with encoded credentials
        netloc = f"{username}:{password}@{parsed.hostname}"
        if parsed.port:
            netloc += f":{parsed.port}"
        return urlunparse(parsed._replace(netloc=netloc))
    return raw

client = MongoClient(build_mongo_uri())
db = client["resume_analyzer"]

users_collection = db["users"]
resumes_collection = db["resumes"]

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import jwt
import sqlite3
import os

router = APIRouter()

SECRET_KEY = os.getenv("JWT_SECRET", "SECRET")
ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserIn(BaseModel):
    username: str
    password: str

def get_db():
    conn = sqlite3.connect("users.db")
    conn.row_factory = sqlite3.Row
    return conn

@router.post("/register")
def register(user: UserIn):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM users WHERE username=?", (user.username,))
    if cursor.fetchone():
        raise HTTPException(status_code=400, detail="המשתמש כבר קיים")
    hashed_password = pwd_context.hash(user.password)
    cursor.execute("INSERT INTO users (username, password, coins) VALUES (?, ?, ?)", (user.username, hashed_password, 100))
    db.commit()
    return {"message": "נרשמת בהצלחה", "username": user.username}

@router.post("/login")
def login(user: UserIn):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM users WHERE username=?", (user.username,))
    db_user = cursor.fetchone()
    if not db_user or not pwd_context.verify(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="פרטי התחברות שגויים")
    token = jwt.encode({"sub": user.username}, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": token, "token_type": "bearer", "username": user.username, "coins": db_user["coins"]}

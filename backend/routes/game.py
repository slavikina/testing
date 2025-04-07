from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import sqlite3
import random

router = APIRouter()

COST_PER_SPIN = 10
REWARDS = [0, 0, 0, 10, 20, 50, 0, 100, 0, 500]  # הגרלות עם סיכויי זכייה

class SpinRequest(BaseModel):
    username: str

def get_db():
    conn = sqlite3.connect("users.db")
    conn.row_factory = sqlite3.Row
    return conn

@router.post("/game/roulette")
def play_roulette(data: SpinRequest):
    db = get_db()
    cursor = db.cursor()

    # שליפת משתמש
    cursor.execute("SELECT * FROM users WHERE username=?", (data.username,))
    user = cursor.fetchone()
    if not user:
        raise HTTPException(status_code=404, detail="המשתמש לא נמצא")

    if user["coins"] < COST_PER_SPIN:
        raise HTTPException(status_code=400, detail="אין מספיק מטבעות")

    # הפחתת עלות סיבוב
    new_coins = user["coins"] - COST_PER_SPIN

    # הגרלת פרס
    prize = random.choice(REWARDS)
    new_coins += prize

    # עדכון מסד נתונים
    cursor.execute("UPDATE users SET coins=? WHERE username=?", (new_coins, data.username))
    db.commit()

    return {
        "result": "win" if prize > 0 else "lose",
        "prize": prize,
        "new_balance": new_coins
    }

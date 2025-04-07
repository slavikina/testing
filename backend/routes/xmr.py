from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import sqlite3
import uuid

router = APIRouter()

class UserRequest(BaseModel):
    username: str

def get_db():
    conn = sqlite3.connect("users.db")
    conn.row_factory = sqlite3.Row
    return conn

@router.post("/xmr/get-address")
def get_xmr_address(data: UserRequest):
    db = get_db()
    cursor = db.cursor()

    cursor.execute("SELECT * FROM users WHERE username=?", (data.username,))
    user = cursor.fetchone()
    if not user:
        raise HTTPException(status_code=404, detail="המשתמש לא נמצא")

    if not user["xmr_address"]:
        new_address = f"XMR-{uuid.uuid4()}"
        cursor.execute("UPDATE users SET xmr_address=? WHERE username=?", (new_address, data.username))
        db.commit()
    else:
        new_address = user["xmr_address"]

    return {"xmr_address": new_address}


from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import sqlite3

router = APIRouter()

class WebhookData(BaseModel):
    xmr_address: str
    amount: int

def get_db():
    conn = sqlite3.connect("users.db")
    conn.row_factory = sqlite3.Row
    return conn

@router.post("/xmr/webhook")
def handle_webhook(data: WebhookData):
    db = get_db()
    cursor = db.cursor()

    cursor.execute("SELECT * FROM users WHERE xmr_address=?", (data.xmr_address,))
    user = cursor.fetchone()

    if not user:
        raise HTTPException(status_code=404, detail="כתובת XMR לא נמצאה")

    new_balance = user["coins"] + data.amount
    cursor.execute("UPDATE users SET coins=? WHERE username=?", (new_balance, user["username"]))
    db.commit()

    return {
        "message": "היתרה עודכנה בהצלחה",
        "username": user["username"],
        "new_balance": new_balance
    }


from fastapi import APIRouter, HTTPException, Header
from pydantic import BaseModel
import sqlite3
import os

router = APIRouter()
ADMIN_TOKEN = os.getenv("ADMIN_TOKEN", "superadmin123")

class BalanceUpdate(BaseModel):
    username: str
    new_balance: int

def get_db():
    conn = sqlite3.connect("users.db")
    conn.row_factory = sqlite3.Row
    return conn

@router.get("/admin/users")
def list_users(x_token: str = Header(...)):
    if x_token != ADMIN_TOKEN:
        raise HTTPException(status_code=403, detail="גישה נדחתה")

    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT username, coins FROM users")
    users = cursor.fetchall()
    return [{"username": u["username"], "coins": u["coins"]} for u in users]

@router.post("/admin/update-balance")
def update_balance(data: BalanceUpdate, x_token: str = Header(...)):
    if x_token != ADMIN_TOKEN:
        raise HTTPException(status_code=403, detail="גישה נדחתה")

    db = get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE users SET coins=? WHERE username=?", (data.new_balance, data.username))
    db.commit()

    return {"message": "היתרה עודכנה", "username": data.username, "new_balance": data.new_balance}


from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import sqlite3
import requests

router = APIRouter()

class WebhookData(BaseModel):
    xmr_address: str
    amount: int

def get_db():
    conn = sqlite3.connect("users.db")
    conn.row_factory = sqlite3.Row
    return conn

@router.post("/xmr/webhook")
def handle_webhook(data: WebhookData):
    db = get_db()
    cursor = db.cursor()

    cursor.execute("SELECT * FROM users WHERE xmr_address=?", (data.xmr_address,))
    user = cursor.fetchone()

    if not user:
        raise HTTPException(status_code=404, detail="כתובת XMR לא נמצאה")

    new_balance = user["coins"] + data.amount
    cursor.execute("UPDATE users SET coins=? WHERE username=?", (new_balance, user["username"]))
    db.commit()

    return {"message": "היתרה עודכנה", "username": user["username"], "new_balance": new_balance}

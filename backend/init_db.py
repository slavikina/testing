import sqlite3

conn = sqlite3.connect("users.db")
cursor = conn.cursor()

cursor.execute('''
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    coins INTEGER DEFAULT 100
)
''')

conn.commit()
conn.close()

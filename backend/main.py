from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from routes.auth import router as auth_router
from routes.game import router as game_router
from routes.xmr import router as xmr_router

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",  # vite dev
    "https://yourdomain.com"  # production
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth")

app.include_router(game_router, prefix='/game')

app.include_router(xmr_router, prefix='/xmr')

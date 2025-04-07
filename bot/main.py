from aiogram import Bot, Dispatcher, types
from aiogram.types import WebAppInfo
from aiogram.utils import executor
import os

TOKEN = os.getenv("BOT_TOKEN", "YOUR_BOT_TOKEN")
WEBAPP_URL = os.getenv("WEBAPP_URL", "https://yourdomain.com")

bot = Bot(token=TOKEN)
dp = Dispatcher(bot)

@dp.message_handler(commands=["start"])
async def send_welcome(message: types.Message):
    keyboard = types.ReplyKeyboardMarkup(resize_keyboard=True)
    web_app_button = types.KeyboardButton(text="הפעל את המשחק", web_app=WebAppInfo(url=WEBAPP_URL))
    keyboard.add(web_app_button)
    await message.answer("ברוך הבא ל-LuckyGames! לחץ על הכפתור למטה כדי להתחיל לשחק:", reply_markup=keyboard)

if __name__ == "__main__":
    executor.start_polling(dp, skip_updates=True)

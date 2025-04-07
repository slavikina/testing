import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? "/auth/register" : "/auth/login";
    const res = await fetch("http://localhost:8000" + endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (res.ok) {
      if (!isRegister) {
        localStorage.setItem("token", data.access_token);
        onLogin(data);
      }
      setMessage(data.message || "הצלחה!");
    } else {
      setMessage(data.detail || "שגיאה");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-purple-900 to-black text-white p-4">
      <h1 className="text-3xl font-bold mb-4">{isRegister ? "הרשמה" : "התחברות"}</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
        <input className="w-full p-2 rounded bg-white text-black" placeholder="שם משתמש" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input className="w-full p-2 rounded bg-white text-black" placeholder="סיסמה" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="w-full bg-green-600 p-2 rounded font-bold" type="submit">
          {isRegister ? "הירשם" : "התחבר"}
        </button>
      </form>
      <button className="mt-4 text-sm underline" onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "כבר רשום? התחבר" : "אין לך חשבון? הירשם"}
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}

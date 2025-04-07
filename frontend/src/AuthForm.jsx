import React, { useState } from "react";

export default function AuthForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? "/auth/register" : "/auth/login";
    try {
      const res = await fetch("http://localhost:8000" + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "שגיאה");

      if (!isRegister) {
        onLogin(data);
      } else {
        setMessage("נרשמת בהצלחה! אפשר להתחבר.");
        setIsRegister(false);
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-10 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isRegister ? "הרשמה" : "התחברות"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="שם משתמש"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded text-right"
          required
        />
        <input
          type="password"
          placeholder="סיסמה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded text-right"
          required
        />
        <button
          type="submit"
          className="bg-purple-800 text-white py-2 rounded hover:bg-purple-900"
        >
          {isRegister ? "הרשמה" : "התחברות"}
        </button>
        <p
          className="text-sm text-center text-blue-600 cursor-pointer"
          onClick={() => {
            setIsRegister(!isRegister);
            setMessage("");
          }}
        >
          {isRegister ? "כבר יש לך משתמש? התחבר" : "אין לך משתמש? הירשם"}
        </p>
        {message && <p className="text-center text-red-600">{message}</p>}
      </form>
    </div>
  );
}

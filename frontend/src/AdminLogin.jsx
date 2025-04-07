import React, { useState } from "react";

export default function AdminLogin({ onLogin }) {
  const [token, setToken] = useState("");

  const handleLogin = () => {
    if (token.trim()) {
      localStorage.setItem("admin_token", token);
      onLogin(token);
    }
  };

  return (
    <div className="p-4 text-center bg-gradient-to-b from-black to-purple-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="הזן טוקן מנהל"
        className="p-2 rounded w-64 text-black"
      />
      <br />
      <button
        onClick={handleLogin}
        className="bg-green-600 hover:bg-green-700 mt-4 px-4 py-2 rounded text-white"
      >
        התחבר
      </button>
    </div>
  );
}

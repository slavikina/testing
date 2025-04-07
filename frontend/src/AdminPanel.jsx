import React, { useEffect, useState } from "react";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [newBalance, setNewBalance] = useState("");

  const token = localStorage.getItem("admin_token");

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:8000/admin/users", {
      headers: { "x-token": token },
    });
    const data = await res.json();
    setUsers(data);
  };

  const updateBalance = async () => {
    const res = await fetch("http://localhost:8000/admin/update-balance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify({ username: selectedUser, new_balance: Number(newBalance) }),
    });
    const data = await res.json();
    alert(data.message);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4 text-white bg-gradient-to-b from-black to-purple-900 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-4">ניהול משתמשים</h1>
      <div className="max-w-md mx-auto">
        <table className="w-full mb-6 border border-white text-right">
          <thead>
            <tr>
              <th className="p-2 border">שם משתמש</th>
              <th className="p-2 border">יתרה</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i}>
                <td className="p-2 border">{u.username}</td>
                <td className="p-2 border">{u.coins}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="text-xl font-bold mb-2">עדכון יתרה</h2>
        <select
          className="w-full p-2 text-black mb-2"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">בחר משתמש</option>
          {users.map((u, i) => (
            <option key={i} value={u.username}>
              {u.username}
            </option>
          ))}
        </select>
        <input
          type="number"
          className="w-full p-2 mb-2 text-black"
          placeholder="יתרה חדשה"
          value={newBalance}
          onChange={(e) => setNewBalance(e.target.value)}
        />
        <button
          onClick={updateBalance}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded w-full"
        >
          עדכן יתרה
        </button>
      </div>
    </div>
  );
}

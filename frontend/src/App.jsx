import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthForm from "./AuthForm";
import GameMenu from "./GameMenu";
import AdminLogin from "./AdminLogin";
import AdminPanel from "./AdminPanel";

export default function App() {
  const [user, setUser] = useState(null);
  const [adminToken, setAdminToken] = useState(localStorage.getItem("admin_token"));

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={!user ? <AuthForm onLogin={setUser} /> : <GameMenu user={user} setUser={setUser} />}
        />
        <Route
          path="/admin"
          element={
            !adminToken ? (
              <AdminLogin onLogin={setAdminToken} />
            ) : (
              <AdminPanel />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

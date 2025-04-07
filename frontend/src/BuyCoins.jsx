import React, { useEffect, useState } from "react";

export default function BuyCoins({ user, onBack }) {
  const [xmrAddress, setXmrAddress] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await fetch("http://localhost:8000/xmr/get-address", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: user.username }),
        });
        const data = await res.json();
        setXmrAddress(data.xmr_address);
      } catch (err) {
        setXmrAddress("שגיאה בקבלת כתובת");
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, [user.username]);

  return (
    <div className="p-4 min-h-screen bg-gradient-to-b from-black to-purple-900 text-white text-center">
      <h1 className="text-3xl font-bold mb-6">קניית מטבעות</h1>
      <p className="mb-4 text-lg">שלח כמות כלשהי של XMR לכתובת הבאה:</p>
      {loading ? (
        <p>טוען כתובת...</p>
      ) : (
        <>
          <div className="bg-gray-800 p-4 rounded text-yellow-300 break-all font-mono mb-4">
            {xmrAddress}
          </div>
          <p className="text-sm text-gray-300">
            עם קבלת התשלום, היתרה שלך תעודכן אוטומטית.
          </p>
        </>
      )}
      <br />
      <button
        onClick={onBack}
        className="mt-8 underline text-white text-sm"
      >
        חזרה לתפריט
      </button>
    </div>
  );
}

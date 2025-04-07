import React, { useState } from "react";

const symbols = ["🍒", "🍋", "🔔", "🍇", "💎", "7️⃣"];

export default function SlotMachine({ onBack }) {
  const [reels, setReels] = useState(["❓", "❓", "❓"]);
  const [result, setResult] = useState("");
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    setSpinning(true);
    setResult("");
    let spins = 20;
    let interval = setInterval(() => {
      const newReels = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ];
      setReels(newReels);
      spins--;
      if (spins === 0) {
        clearInterval(interval);
        setSpinning(false);
        if (newReels[0] === newReels[1] && newReels[1] === newReels[2]) {
          setResult("!זכית בפרס");
        } else {
          setResult("נסה שוב...");
        }
      }
    }, 100);
  };

  return (
    <div className="p-4 min-h-screen bg-gradient-to-b from-black to-purple-900 text-white text-center">
      <h1 className="text-3xl font-bold mb-4">מכונת מזל</h1>
      <div className="flex justify-center gap-4 text-6xl font-mono mb-6">
        {reels.map((r, i) => (
          <span key={i}>{r}</span>
        ))}
      </div>
      <button
        onClick={spin}
        disabled={spinning}
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded text-xl shadow-xl mb-4"
      >
        {spinning ? "מסתובב..." : "סובב"}
      </button>
      {result && <p className="text-2xl mt-4">{result}</p>}
      <br />
      <button
        onClick={onBack}
        className="mt-6 underline text-white text-sm"
      >
        חזרה לתפריט
      </button>
    </div>
  );
}

import React, { useState } from "react";
import SlotMachine from "./SlotMachine";
import BuyCoins from "./BuyCoins";
import Roulette from "./Roulette";

export default function GameMenu({ user }) {
  const [selectedGame, setSelectedGame] = useState(null);

  const games = [
    { name: "מכונת מזל", id: "slot", emoji: "🎰" },
    { name: "רולטה", id: "roulette", emoji: "🎯" },
    { name: "קוביה", id: "dice", emoji: "🎲" },
    { name: "הטלת מטבע", id: "coin", emoji: "🪙" },
  ];

  if (selectedGame === "buy") return <BuyCoins user={user} onBack={() => setSelectedGame(null)} />;
  if (selectedGame === "slot") return <SlotMachine onBack={() => setSelectedGame(null)} />;
  if (selectedGame === "roulette") return <Roulette onBack={() => setSelectedGame(null)} />;
    return <SlotMachine onBack={() => setSelectedGame(null)} />;
  }

  return (
    <div className="p-4 min-h-screen bg-gradient-to-b from-purple-900 to-black text-white text-center">
      <h1 className="text-3xl font-bold mb-4">שלום {user.username}!</h1>
      <p className="text-xl mb-6">יתרת מטבעות: {user.coins}</p>
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {games.map((game) => (
          <button
            key={game.id}
            className="bg-purple-700 hover:bg-purple-800 rounded-xl p-6 text-xl font-semibold shadow-xl transition"
            onClick={() => setSelectedGame(game.id)}
          >
            <span className="text-4xl">{game.emoji}</span><br />
            {game.name}
          </button>
        ))}
      <button onClick={() => setSelectedGame("buy")} className="col-span-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold">קנה מטבעות</button>
      </div>
    <button onClick={() => setSelectedGame("buy")} className="col-span-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold">קנה מטבעות</button>
      </div>
  );
}

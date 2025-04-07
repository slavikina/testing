import React, { useState } from "react";
import { Howl } from 'howler';

const sweepLightSound = new Howl({
  src: ['https://www.example.com/sweep_light.mp3'],
  volume: 0.5
});

const winSound = new Howl({
  src: ['https://www.example.com/win_sound.mp3'],
  volume: 0.8
});

const jackpotSound = new Howl({
  src: ['https://www.example.com/jackpot_sound.mp3'],
  volume: 1
});

export default function Roulette({ user, setUser, onBack }) {
  const [spinning, setSpinning] = useState(false);
  const [message, setMessage] = useState("");
  const [prize, setPrize] = useState(null);

  const spin = async () => {
    setSpinning(true);
    setPrize(null);
    setMessage("");

    sweepLightSound.play();

    setTimeout(() => {
      const win = Math.random() < 0.1; // 10% chance for Jackpot
      const prizeAmount = win ? (Math.random() < 0.5 ? 500 : 1000) : 0;
      setPrize(prizeAmount);

      if (prizeAmount > 0) {
        jackpotSound.play();
        setMessage(`!JACKPOT! זכית ב-${prizeAmount} מטבעות`);
      } else {
        winSound.play();
        setMessage("לא זכית הפעם...");
      }

      const newBalance = user.coins + prizeAmount;
      setUser({ ...user, coins: newBalance });
      setSpinning(false);
    }, 4000);
  };

  return (
    <div className="p-4 min-h-screen bg-gradient-to-b from-black to-purple-900 text-white text-center">
      <h1 className="text-3xl font-bold mb-4">רולטה - גרסה משודרגת</h1>
      <p className="text-xl mb-2">יתרה: {user.coins} מטבעות</p>
      <div className="relative w-60 h-60 mx-auto mb-6">
        <div className="absolute w-full h-full rounded-full border-4 border-yellow-400">
          <div className="text-4xl mt-20">🎯</div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full text-3xl">▲</div>
      </div>
      <button
        onClick={spin}
        disabled={spinning || user.coins < 10}
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded text-xl shadow-xl"
      >
        {spinning ? "מסתובב..." : "סובב (10 מטבעות)"}
      </button>
      {message && <p className="text-xl mt-4">{message}</p>}
      <br />
      <button onClick={onBack} className="mt-6 underline text-white text-sm">
        חזרה לתפריט
      </button>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PlayerForm = () => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [mode, setMode] = useState('multiplayer');
  const [showRules, setShowRules] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'multiplayer' && player1 && player2) {
      navigate('/game/multiplayer', { state: { player1, player2, mode } });
    } else if (mode === 'singleplayer' && player1) {
      navigate('/game/singleplayer', { state: { player1, player2: 'Computer', mode } });
    }
  };

  const toggleRules = () => {
    setShowRules(!showRules);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-500 via-blue-400 to-cyan-600 p-6 text-blue-300">
      <h1 className="text-5xl font-bold mb-8 text-center text-yellow-400">Dice Game Setup 🎲</h1>

      {/* Form to Enter Player Names */}
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="mb-6">
          <label className="block text-lg font-bold mb-2">Player 1 Name</label>
          <input
            type="text"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
            placeholder="Enter Player 1 Name"
            className="w-full px-4 py-2 text-black rounded-lg border-2 border-gray-300 focus:outline-none focus:border-yellow-500"
            required
          />
        </div>

        {mode === 'multiplayer' && (
          <div className="mb-6">
            <label className="block text-lg font-bold mb-2">Player 2 Name</label>
            <input
              type="text"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
              placeholder="Enter Player 2 Name"
              className="w-full px-4 py-2 text-black rounded-lg border-2 border-gray-300 focus:outline-none focus:border-yellow-500"
              required
            />
          </div>
        )}

        <div className="mb-6">
          <label className="block text-lg font-bold mb-2">Game Mode</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="w-full px-4 py-2 text-black rounded-lg border-2 border-gray-300 focus:outline-none focus:border-yellow-500"
          >
            <option value="multiplayer">Multiplayer</option>
            <option value="singleplayer">Singleplayer</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Start Game
        </button>
      </form>

      {/* Rules Section */}
      <button
        onClick={toggleRules}
        className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300"
      >
        {showRules ? 'Hide Rules' : 'Show Rules'}
      </button>

      {showRules && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl mt-8 max-w-lg text-left">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">Rules of the Game</h2>
          <ul className="list-disc list-inside text-lg space-y-2 text-white">
            <li>Start with ₹500 for both players.</li>
            <li>Each roll costs ₹49.</li>
            <li>Winner gets ₹65. If it's a tie, no one wins.</li>
            <li>The game ends when you reset or balance hits zero.</li>
          </ul>
        </div>
      )}

      {/* Footer */}
      <div className="text-gray-200 mt-12 text-lg font-semibold">
        Made By <span className="text-red-500 font-bold shadow-red-400">Shubh ❤️</span>
      </div>
    </div>
  );
};

export default PlayerForm;

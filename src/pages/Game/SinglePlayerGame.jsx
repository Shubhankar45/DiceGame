import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Game = () => {
  const location = useLocation();
  const { player1, player2, mode } = location.state || { player1: "Player 1", player2: "Player 2", mode: "multiplayer" };
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [winner, setWinner] = useState("Drawn");
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [balance1, setBalance1] = useState(500);
  const [balance2, setBalance2] = useState(500);
  const [round, setRound] = useState(1);

  const rollDice = () => {
    if (currentPlayer === 1) {
      // Player 1 rolls the dice
      setNumber1(Math.floor(1 + Math.random() * 6));
      setBalance1((prevBalance) => prevBalance - 49);

      if (mode === 'multiplayer') {
        setCurrentPlayer(2); // Multiplayer: Switch to Player 2
      } else {
        // Singleplayer: Roll for the computer (Player 2)
        setTimeout(() => {
          setNumber2(Math.floor(1 + Math.random() * 6));
          setBalance2((prevBalance) => prevBalance - 49);
        }, 1000);
      }
    } else {
      // Player 2 rolls the dice (for multiplayer)
      setNumber2(Math.floor(1 + Math.random() * 6));
      setBalance2((prevBalance) => prevBalance - 49);
      setCurrentPlayer(1); // Switch back to Player 1
    }
  };

  useEffect(() => {
    // Determine the winner after both players (or computer) have rolled the dice
    if (number1 !== 0 && number2 !== 0) {
      if (number1 > number2) {
        setWinner(`${player1} Wins!`);
        setBalance1((prevBalance) => prevBalance + 65);
      } else if (number1 < number2) {
        setWinner(`${player2} Wins!`);
        setBalance2((prevBalance) => prevBalance + 65);
      } else {
        setWinner("It's a Tie!");
      }

      // Reset for next round after showing the result for 2 seconds
      setTimeout(() => {
        setNumber1(0);
        setNumber2(0);
        setWinner("Drawn");
        setRound((prevRound) => prevRound + 1);
      }, 2000);
    }
  }, [number1, number2, player1, player2]);

  const reset = () => {
    setNumber1(0);
    setNumber2(0);
    setWinner("Drawn");
    setCurrentPlayer(1);
    setBalance1(500);
    setBalance2(500);
    setRound(1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-500 via-blue-400 to-cyan-600 p-6 text-blue-300">
      <h1 className="text-5xl font-bold mb-8 text-center drop-shadow-xl text-gray-800">
        🎲 {mode === 'singleplayer' ? 'Singleplayer' : 'Multiplayer'} Dice Battle 🎲
      </h1>

      {/* Round */}
      <div className="mb-8 text-3xl font-bold text-yellow-400">Round: {round}</div>

      {/* Player Info */}
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {/* Player 1 */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold mb-4 text-yellow-300">{player1}</h2>
          <p className="text-lg mb-4">
            Balance: <span className="font-bold text-green-400">₹{balance1}</span>
          </p>
          <div className="text-6xl font-bold text-yellow-400">{number1}</div>
        </div>

        {/* Player 2 / Computer */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold mb-4 text-yellow-300">{player2}</h2>
          <p className="text-lg mb-4">
            Balance: <span className="font-bold text-green-400">₹{balance2}</span>
          </p>
          <div className="text-6xl font-bold text-yellow-400">{number2}</div>
        </div>
      </div>

      {/* Winner and Buttons */}
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-lg w-full text-center mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-pink-300">Winner</h2>
        <div className={`text-4xl font-bold ${winner === "It's a Tie!" ? "text-yellow-400" : "text-green-500"}`}>{winner}</div>

        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={rollDice}
            className={`py-2 px-8 font-bold rounded-full transition duration-300 transform hover:scale-110 shadow-lg ${
              currentPlayer === 1
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {`Player ${currentPlayer}'s Turn`}
          </button>
        </div>

        <button
          onClick={reset}
          className="mt-6 py-2 px-6 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full shadow-lg transform hover:scale-105 transition duration-300"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default Game;

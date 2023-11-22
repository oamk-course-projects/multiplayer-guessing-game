// src/features/game/GameBoard.jsx
import React, { useState } from 'react';
import GuessForm from '../../components/GuessForm'; // Assuming GuessForm is placed in the components directory

function GameBoard() {
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [correctNumber, setCorrectNumber] = useState(Math.floor(Math.random() * 100) + 1); // Random number between 1 and 100

  const handleGuessSubmit = (userGuess) => {
    const numGuess = parseInt(userGuess, 10);
    setGuess('');
    setAttempts((prevAttempts) => prevAttempts + 1); // Ensure attempts are incremented

    if (numGuess === correctNumber) {
      setFeedback('Correct!');
    } else if (numGuess > correctNumber) {
      setFeedback('Too high!');
    } else {
      setFeedback('Too low!');
    }
  };

  const handleReset = () => {
    setGuess('');
    setFeedback('');
    setAttempts(0);
    setCorrectNumber(Math.floor(Math.random() * 100) + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white max-w-md w-full rounded-lg shadow-2xl p-8 m-4">
        <h2 className="text-3xl text-center font-bold mb-8">Guess the Number</h2>
        <GuessForm onGuessSubmit={handleGuessSubmit} attempts={attempts} />
        {feedback && (
          <div className={`mt-4 p-4 text-center font-bold ${feedback === 'Correct!' ? 'text-green-500' : 'text-red-500'}`}>
            {feedback}
          </div>
        )}
        {feedback === 'Correct!' && (
          <button
            onClick={handleReset}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300 ease-in-out"
          >
            Start New Game
          </button>
        )}
      </div>
    </div>
  );
}

export default GameBoard;

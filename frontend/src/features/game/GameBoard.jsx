import React, { useState } from 'react';

function GameBoard() {
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [correctNumber, setCorrectNumber] = useState(Math.floor(Math.random() * 100) + 1); // Random number between 1 and 100

  const handleGuess = async () => {
    setAttempts(prev => prev + 1);
    // Backend call could go here to check the guess
    // For now, we'll do it in the frontend
    if (parseInt(guess) === correctNumber) {
      setFeedback('Correct!');
      // Here you could also handle what happens when the game is won
    } else if (parseInt(guess) > correctNumber) {
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
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-3xl mb-4">Guess the Number</h2>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        className="mb-4 p-2 border-2 border-gray-300 rounded"
        placeholder="Enter your guess..."
      />
      <button onClick={handleGuess} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Submit Guess</button>
      <p className="mt-4">{feedback}</p>
      <p>Attempts: {attempts}</p>
      {feedback === 'Correct!' && <button onClick={handleReset} className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">Start New Game</button>}
    </div>
  );
}

export default GameBoard;

// src/components/GuessForm.jsx
import React, { useState } from 'react';

const GuessForm = ({ onGuessSubmit, attempts }) => {
  const [guess, setGuess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuessSubmit(guess);
    setGuess(''); // Reset the guess input field
  };

  return (
    <div className="flex flex-col">
      <div className="mb-2">
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="Enter your guess..."
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out shadow-lg"
      >
        Submit Guess
      </button>
      <div className="text-center mt-4 font-bold text-lg">
        Attempts: <span className="text-blue-600">{attempts}</span>
      </div>
    </div>
  );
};

export default GuessForm;

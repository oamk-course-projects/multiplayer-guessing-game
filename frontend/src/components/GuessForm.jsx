import React, { useState } from 'react';

const GuessForm = ({ onGuessSubmit, attempts }) => {
    const [guess, setGuess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onGuessSubmit(guess);
        setGuess(''); // Reset the guess input field after submitting
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <input
                    type="number"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
                    placeholder="Enter your guess..."
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
            >
                Submit Guess
            </button>
            <div className="text-center mt-4">
                Attempts: <span className="font-bold">{attempts}</span>
            </div>
        </form>
    );
};

export default GuessForm;

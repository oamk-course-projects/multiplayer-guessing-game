import { useState, useEffect } from 'react';
import GuessForm from '../../components/GuessForm';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5005');

function GameBoard() {
  const [feedback, setFeedback] = useState('');
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    socket.on('gameState', (gameState) => {
      setFeedback(gameState.feedback);
      setAttempts(gameState.attempts);
    });

    return () => socket.off('gameState');
  }, []);

  const handleGuessSubmit = (guess) => {
    // Send the guess to the server via Socket.IO event
    socket.emit('newGuess', guess);
  };

  const handleReset = () => {
    socket.emit('reset');
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

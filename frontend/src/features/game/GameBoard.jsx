import React, { useState, useEffect } from 'react';
import GuessForm from '../../components/GuessForm';
import { io } from 'socket.io-client';
import { set } from 'mongoose';

const socket = io('http://localhost:5005');

function GameBoard({ roomId }) {
  const [feedback, setFeedback] = useState('');
  const [guessFeedback, setGuessFeedback] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showResetButton, setShowResetButton] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const username = localStorage.getItem('username');

  useEffect(() => {
    socket.emit('joinRoom', roomId, username);

    socket.on('gameState', (gameState) => {
      setAttempts(gameState.attempts);
      setShowResetButton(gameState.attempts >= gameState.maxGuesses || gameState.winner !== null);
    });

    socket.on('guessFeedback', (result) => {
      setGuessFeedback(result.feedback);
    });

    socket.on('attemptUpdate', (data) => {
      setAttempts(data.attempts);
    });
    socket.on('gameOver', (data) => {
      setFeedback(`${data.winner} won the game!`);
      setIsGameOver(true);
      setShowResetButton(true);
      handleGameOver(data.winner);
    });

    socket.on('maxAttemptsReached', (data) => {
      alert(data.message);
      setShowResetButton(true);
    });

    return () => {
      socket.off('gameState');
      socket.off('guessFeedback');
      socket.off('gameOver');
      socket.emit('leaveRoom', roomId);
    };
  }, [roomId, username, attempts]);

  const handleGuessSubmit = (guess) => {
    socket.emit('newGuess', guess);
    setGuessFeedback('');
  };

  const handleReset = () => {
    socket.emit('reset');
    setShowResetButton(false);
    setAttempts(0);
    setFeedback('');
    setGuessFeedback('');
  };
  const handleGameOver = async (winner) => {
    const isWinner = username === winner;
    const gameData = {
        username,
        won: isWinner,
        attempts
    };
    try {
      await fetch('http://localhost:5005/api/game-history', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, won: true, attempts })
        });
    } catch (error) {
      console.error('Error saving game history:', error);
  }
};
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <div className="bg-white max-w-md w-full rounded-lg shadow-2xl p-8 m-4">
            <h2 className="text-3xl text-center font-bold mb-8">Guess the Number</h2>
            {!isGameOver && (
                <GuessForm onGuessSubmit={handleGuessSubmit} attempts={attempts} />
            )}
            {guessFeedback && (
                <div className={`mt-4 p-4 rounded-lg text-center font-bold text-lg ${guessFeedback === 'Correct!' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {guessFeedback}
                </div>
            )}
            {feedback && (
                <div className={`mt-4 p-4 text-center font-bold ${feedback.includes('won') ? 'text-green-500' : 'text-red-500'}`}>
                    {feedback}
                </div>
            )}
            {isGameOver && (
                <button
                    onClick={handleReset}
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out"
                >
                    Start New Game
                </button>
            )}
        </div>
    </div>
);

}

export default GameBoard;

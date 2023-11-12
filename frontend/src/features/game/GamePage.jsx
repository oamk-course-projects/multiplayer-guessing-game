// src/features/game/GamePage.jsx

import React from 'react';
import GameBoard from './GameBoard';

function GamePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-4xl font-bold mb-4">Multiplayer Guessing Game</h2>
      <p className="mb-8">Guess the right number and win!</p>
      <GameBoard />
    </div>
  );
}

export default GamePage;

// src/features/game/GamePage.jsx

import {useContext} from 'react';
import GameBoard from './GameBoard';
import { UserContext } from '../../contexts/UserContext.jsx';

function GamePage() {
  const { user } = useContext(UserContext);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-4xl font-bold mb-4">Multiplayer Guessing Game</h2>
      <h2 className="text-4xl font-bold mb-4">{user && <p className="mb-4">Logged in as: {user.username}</p>}</h2>
      <p className="mb-8">Guess the right number and win!</p>
      <GameBoard />
    </div>
  );
}

export default GamePage;

import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import GameBoard from './GameBoard';

function GamePage() {
  const { user } = useContext(UserContext);
  const [roomId, setRoomId] = useState('');
  const [joinRoom, setJoinRoom] = useState(false);

  console.log('User data in GamePage:', user);

  const handleRoomIdChange = (event) => {
    setRoomId(event.target.value);
  };

  const handleJoinRoom = () => {
    if (roomId.trim() !== '') {
      setJoinRoom(true);
    } else {
      alert('Please enter a valid room ID.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-4xl font-bold mb-4">Multiplayer Guessing Game</h2>
      {user && (
        <p className="mb-4">Logged in as: {user.username}</p>
      )}
      <p className="mb-8">Guess the right number and win!</p>

      {!joinRoom && (
        <div>
          <input
            type="text"
            value={roomId}
            onChange={handleRoomIdChange}
            placeholder="Enter Room ID"
            className="border-2 border-gray-300 rounded p-2"
          />
          <button
            onClick={handleJoinRoom}
            className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Join Room
          </button>
        </div>
      )}

      {joinRoom && user && (
        <GameBoard roomId={roomId} username={user.username} />
      )}
    </div>
  );
}

export default GamePage;

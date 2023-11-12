import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('/src/assets/background.jpg')" }}>
      <div className="bg-black bg-opacity-50 p-10 rounded-lg shadow-xl text-center">
        <h1 className="text-5xl text-white font-bold mb-6">Welcome to the Multiplayer Guessing Game!</h1>
        <p className="text-white text-xl mb-4">If you have an account, you can <Link to="/login" className="text-blue-400 hover:text-blue-500">Login</Link></p>
        <p className="text-white text-xl">If you don't have an account, please <Link to="/register" className="text-blue-400 hover:text-blue-500">Register</Link></p>
      </div>
    </div>
  );
}

export default HomePage;

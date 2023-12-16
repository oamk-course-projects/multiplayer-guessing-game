// src/components/Navbar.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="bg-gradient-to-r from-blue-800 to-purple-600 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-5">
        <Link to="/" className="text-2xl font-bold">
          Multiplayer Guessing Game
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-lg transition-colors duration-300 hover:text-blue-200">
            Home
          </Link>
          {isLoggedIn && (
             <>
             <Link to="/game" className="text-lg transition-colors duration-300 hover:text-blue-200">
               Game
             </Link>
             <Link to="/player-history" className="text-lg transition-colors duration-300 hover:text-blue-200">
               Player History
             </Link>
           </>
          )}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="text-lg transition-colors duration-300 hover:text-blue-200">
                Login
              </Link>
              <Link to="/register" className="text-lg transition-colors duration-300 hover:text-blue-200">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

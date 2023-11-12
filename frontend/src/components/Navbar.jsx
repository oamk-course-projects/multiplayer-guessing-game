// src/components/Navbar.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token
    navigate('/login'); // Redirect to the login page
    // Trigger a re-render. You might use a state management solution or context for a real app
    window.location.reload();
  };

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Multiplayer Guessing Game
        </Link>
        <div className="flex space-x-6 text-lg">
          <Link to="/" className="hover:text-blue-400 transition duration-300 ease-in-out">
            Home
          </Link>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="hover:text-red-400 transition duration-300 ease-in-out">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-400 transition duration-300 ease-in-out">
                Login
              </Link>
              <Link to="/register" className="hover:text-blue-400 transition duration-300 ease-in-out">
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

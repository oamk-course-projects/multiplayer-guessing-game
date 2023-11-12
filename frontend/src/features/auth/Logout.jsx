// src/features/auth/Logout.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear user token or session data
    navigate('/login'); // Redirect to login page after logout
    // Here you can also update the state to reflect that the user is logged out
  };

  return (
    <button onClick={handleLogout} className="text-white bg-red-500 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
      Logout
    </button>
  );
}

export default Logout;

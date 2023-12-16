// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import GamePage from './features/game/GamePage'; // Import the new GamePage component
import HomePage from './HomePage';
import PlayerHistory from './features/history/PlayerHistory';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen justify-between">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/game" element={<GamePage />} /> 
            <Route path="/" element={<HomePage />} />
            <Route path="/player-history" element={<PlayerHistory />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

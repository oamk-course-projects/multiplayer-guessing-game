import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
dotenv.config();

// MongoDB Connection
connectDB();

// Express App Setup
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// HTTP Server and Socket.IO Setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust the origin according to your frontend deployment
    methods: ["GET", "POST"] // Allowable methods
  }
});

// Store game state - this is very basic and would need to be expanded for a full game
const gameState = {
  players: {}, // Stores player socket ids
  guesses: {}, // Stores guesses for each player
  correctNumber: Math.floor(Math.random() * 100) + 1 // Random number between 1 and 100
};

// Handling WebSocket Connections
io.on('connection', (socket) => {
  console.log('New WebSocket connection established with id:', socket.id);
  // Handle player joining the game
  socket.on('joinGame', (playerId) => {
    gameState.players[socket.id] = playerId;
    console.log(`Player ${playerId} with socket id ${socket.id} joined the game`);
    // Send current state to the new player
    socket.emit('gameState', gameState);
  });

  // Handle a new guess
  socket.on('newGuess', (guess) => {
    console.log(`Player ${socket.id} guessed ${guess}`);
    gameState.guesses[socket.id] = guess;
    // Check the guess
    let result = '';
    if (guess === gameState.correctNumber) {
      result = 'correct';
      // You might want to handle ending the game or starting a new round here
    } else if (guess < gameState.correctNumber) {
      result = 'too low';
    } else if (guess > gameState.correctNumber) {
      result = 'too high';
    }
    // Send result back to all players
    console.log(`WebSocket connection ${socket.id} disconnected`);
    io.emit('guessResult', { playerId: gameState.players[socket.id], guess, result });
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`Player ${gameState.players[socket.id]} disconnected`);
    // Remove player from game state
    delete gameState.players[socket.id];
    delete gameState.guesses[socket.id];
    // Update all players with the new game state
    io.emit('gameState', gameState);
  });
});

// Define Express Routes
app.get('/', (req, res) => {
  res.send('Server is running and ready for WebSocket connections');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Define API Routes
app.use('/api/users', userRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`HTTP server running on port ${PORT}`);
});

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

// Store game state for each room
const rooms = {};

// Function to send game state updates to all players in a room
const sendGameState = (roomId) => {
  const gameState = rooms[roomId];
  io.to(roomId).emit('gameState', gameState);
};
  
io.on('connection', (socket) => {
  console.log('New WebSocket connection established with id:', socket.id);

  socket.on('joinRoom', (roomId, playerId) => {
    // Create room if it doesn't exist
    if (!rooms[roomId]) {
      rooms[roomId] = {
        players: {},
        guesses: {},
        correctNumber: Math.floor(Math.random() * 10) + 1,
        maxGuesses: 3,
        currentRound: 1,
      };
    }
    // Add player to room
    rooms[roomId].players[socket.id] = playerId;
    console.log(`Player ${playerId} with socket id ${socket.id} joined room ${roomId}`);
    // Join the room
    socket.join(roomId);
    // Send current state to the new player
    sendGameState(roomId);
    // Notify other players that a new player has joined
    socket.to(roomId).emit('playerJoined', playerId);

    // Handle a new guess in a room
    socket.on('newGuess', (guess) => {
      console.log(`Player ${socket.id} guessed ${guess} in room ${roomId}`);
      console.log(`Received guess from player ${socket.id}: ${guess}`);
      const gameState = rooms[roomId];
      gameState.guesses[socket.id] = guess;
      // Check the guess
      let result = '';
      if (guess === gameState.correctNumber) {
        result = 'correct';
        // You might want to handle ending the game or starting a new round here
        // add the possibility to start a new round
      } else if (guess < gameState.correctNumber) {
        result = 'too low';
      } else if (guess > gameState.correctNumber) {
        result = 'too high';
      }
      // Send result back to all players
      io.to(roomId).emit('guessResult', { playerId: gameState.players[socket.id], guess, result });
      sendGameState(roomId);
    });

    // Handle disconnect within the room
    socket.on('disconnect', () => {
      const gameState = rooms[roomId];
      if (gameState && gameState.players[socket.id]) {
        console.log(`Player ${gameState.players[socket.id]} disconnected`);
        delete gameState.players[socket.id];
        delete gameState.guesses[socket.id];
        sendGameState(roomId); // Send updated game state after player disconnects
        socket.to(roomId).emit('playerLeft', gameState.players[socket.id]); // Notify other players about disconnection
      }
    });
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

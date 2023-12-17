import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import gameHistoryRoutes from './routes/gameHistoryRoutes.js';
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

const rooms = {};

io.on('connection', (socket) => {
  socket.on('joinRoom', (roomId, username) => {
    socket.currentRoom = roomId;
    if (!rooms[roomId]) {
      rooms[roomId] = {
        players: {},
        guesses: {},
        correctNumber: Math.floor(Math.random() * 10) + 1, // Guessing number between 1 and 100
        maxGuesses: 3,
        currentRound: 1,
        attempts: 0,
        winner: null
      };
      console.log(`New room: ${rooms[roomId]}`);
      console.log(`New room created: ${roomId}`);
    }
    rooms[roomId].players[socket.id] = username;
    socket.join(roomId);
    console.log(`${username} joined room ${roomId}`);
  });

  socket.on('newGuess', (guess) => {
    const roomId = socket.currentRoom;
        if (!roomId || !rooms[roomId]) {
            console.error(`Room not found for guess submission. Room ID: ${roomId}`);
            return;
        }

        const gameState = rooms[roomId];
        // Ensure that gameState.attempts is an object
        if (typeof gameState.attempts !== 'object') {
          gameState.attempts = {};
      }

        // Initialize attempts for the player if not already done
        if (!gameState.attempts[socket.id]) {
          gameState.attempts[socket.id] = 0;
      }

    // Check if this player has reached maximum attempts
    if (gameState.attempts[socket.id] >= gameState.maxGuesses) {
      socket.emit('maxAttemptsReached', { message: 'Maximum number of attempts reached' });
      return;
    }
    const numericGuess = parseInt(guess, 10);
    if (isNaN(numericGuess)) {
      console.error('Invalid guess:', guess);
      return;
    }

    console.log(`${gameState.players[socket.id]} guessed ${numericGuess} in room ${roomId}`);
    gameState.guesses[socket.id] = numericGuess;
    gameState.attempts[socket.id]++;
    console.log(`Game State Update in Room ${roomId}:`, JSON.stringify(gameState, null, 2));


    let feedback;
    if (numericGuess === gameState.correctNumber) {
      feedback = 'Correct!';
      gameState.winner = gameState.players[socket.id];
      console.log(`Winner found: ${gameState.winner}`);
      io.to(roomId).emit('gameOver', { winner: gameState.winner });
    } else if (numericGuess < gameState.correctNumber) {
      feedback = 'Too low';
    } else {
      feedback = 'Too high';
    }
    // Emit attempt count to the specific player
    socket.emit('attemptUpdate', { attempts: gameState.attempts[socket.id] });
    socket.emit('guessFeedback', { guess: numericGuess, feedback });
    if (!gameState.winner && gameState.attempts >= gameState.maxGuesses) {
      io.to(roomId).emit('maxAttemptsReached', { message: 'Maximum number of attempts reached' });
    }
  });

  socket.on('reset', () => {
    const roomId = socket.currentRoom;
    const gameState = rooms[roomId];
    if (roomId && gameState) {
      gameState.correctNumber = Math.floor(Math.random() * 100) + 1;
      gameState.guesses = {};
      gameState.attempts = 0;
      gameState.winner = null;
      gameState.attempts = {};
      console.log(`Game reset in room ${roomId}`);
      console.log(`Game reset in room ${roomId}`);
      console.log(`New Game State after Reset:`, JSON.stringify(rooms[roomId], null, 2));
  
    }
  });

  socket.on('disconnect', () => {
    const roomId = socket.currentRoom;
    const gameState = rooms[roomId];
    if (roomId && gameState && gameState.players[socket.id]) {
      delete gameState.players[socket.id];
      delete gameState.guesses[socket.id];
      if (Object.keys(gameState.players).length === 0) {
        delete rooms[roomId];
        console.log(`Room ${roomId} deleted as last player left`);
      }
    }
  });
});

app.get('/', (req, res) => {
  res.send('Server is running and ready for WebSocket connections');
});

app.use('/api/users', userRoutes);
app.use('/api/game-history', gameHistoryRoutes);


const PORT = process.env.PORT || 5005;
server.listen(PORT, () => {
  console.log(`HTTP server running on port ${PORT}`);
});

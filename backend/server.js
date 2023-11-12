import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
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
const io = new Server(server);

// Handling WebSocket Connections
io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Define Express Routes
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

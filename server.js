const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan'); 

require('dotenv').config(); 

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Express App Setup
const app = express();
app.use(cors()); 
app.use(express.json());
app.use(morgan('combined')); 

// HTTP Server and Socket.IO Setup
const server = http.createServer(app);
const io = socketIo(server);

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
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

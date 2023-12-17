# Multiplayer Guessing Game

## Introduction

Multiplayer Guessing Game - an engaging and interactive online game where players challenge each other in guessing a secret number. Built with the MERN stack (MongoDB, Express.js, React, and Node.js), this game offers a seamless real-time gaming experience, enhanced by the power of Socket.IO for real-time communication.

## Key Features

- **Multiplayer Gameplay**: Join game rooms and compete with other players in real-time.
- **Dynamic User Interface**: Built with React, offering a responsive and interactive user experience.
- **Real-Time Updates**: Leveraging Socket.IO for instant gameplay updates and player interactions.
- **User Authentication**: Secure registration and login process, ensuring a personalized experience.
- **Game History Tracking**: Records and displays player game history for performance tracking.
- **Responsive Design**: Compatible with various devices, providing an optimal gaming experience on both desktop and mobile.

## Tech Stack

- **Frontend**: React, Socket.IO Client, Tailwind CSS
- **Backend**: Node.js, Express.js, Socket.IO
- **Database**: MongoDB

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/oamk-course-projects/multiplayer-guessing-game.git
   ```
2. Install backend dependencies:
   ```bash
   cd multiplayer-guessing-game
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
5. Start the frontend application:
   ```bash
   npm run dev
   ```

## API Endpoints

| Endpoint              | HTTP Method | Description                              |
| --------------------- | ----------- | ---------------------------------------- |
| `/api/users/register` | POST        | Registers a new user                     |
| `/api/users/login`    | POST        | Authenticates a user and returns a token |
| `/api/game-history`   | GET         | Retrieves the game history for all users |
| `/api/game-history`   | POST        | Records a new game history entry         |

### Usage

- **Registration and Login**: Securely register and log in to access the game.
- **Join a Game**: Enter a game room and start playing against others.
- **Guessing Numbers**: Test your intuition by guessing the secret number.
- **Track Your Progress**: Review your game history and improve your strategy.

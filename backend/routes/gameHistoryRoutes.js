// routes/gameHistoryRoutes.js
import express from 'express';
import { getGameHistory, createGameHistory } from '../controllers/GameHistoryController.js';

const router = express.Router();

// GET route to get game history
router.get('/', getGameHistory);

// POST route to create game history
router.post('/', createGameHistory);

export default router;

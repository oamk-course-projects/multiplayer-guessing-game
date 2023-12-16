// controllers/GameHistoryController.js
import GameHistory from '../models/GameHistoryModel.js';

export const getGameHistory = async (req, res) => {
    try {
        const history = await GameHistory.find();
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createGameHistory = async (req, res) => {
    const { username, won, attempts } = req.body;

    try {
        const newEntry = await GameHistory.create({ username, won, attempts });
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

import mongoose from 'mongoose';

const gameHistorySchema = mongoose.Schema({
    username: { type: String, required: true },
    won: { type: Boolean, required: true },
    attempts: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

const GameHistory = mongoose.model('GameHistory', gameHistorySchema);

export default GameHistory;

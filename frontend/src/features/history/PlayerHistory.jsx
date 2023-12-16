import React, { useState, useEffect } from 'react';

const PlayerHistory = () => {
    const [history, setHistory] = useState([]);
    const fetchHistory = async () => {
        try {
            const response = await fetch('http://localhost:5005/api/game-history');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setHistory(data);
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    };
    
    useEffect(() => {
        fetchHistory();
    }, []);
    
    

    return (
        <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Game History</h2>
        <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">Username</th>
                    <th className="border border-gray-300 px-4 py-2">Result</th>
                    <th className="border border-gray-300 px-4 py-2">Attempts</th>
                    <th className="border border-gray-300 px-4 py-2">Date</th>
                </tr>
            </thead>
            <tbody>
                {history.map((entry, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                        <td className="border border-gray-300 px-4 py-2">{entry.username}</td>
                        <td className="border border-gray-300 px-4 py-2">{entry.won ? 'Won' : 'Lost'}</td>
                        <td className="border border-gray-300 px-4 py-2">{entry.attempts}</td>
                        <td className="border border-gray-300 px-4 py-2">{new Date(entry.date).toLocaleDateString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    
    );
};

export default PlayerHistory;

const express = require('express');
const router = express.Router();

const authenticateToken = require('../utils/auth.token.js');

// Mock data - Replace with actual API calls later
const mockUserData = {
    username: "Coderbian",
    userId: "23120006",
    joinDate: "Oct 5, 2005",
    rank: "Master Chef",
    stats: {
        totalBattles: 210,
        wins: 105,
        losses: 105,
        points: 12400,
        bestStreak: 12
    },
    recentMatches: [
        { opponent: "BattleKing", result: "win", score: "3-2" },
        { opponent: "TankLegend", result: "loss", score: "1-3" },
        { opponent: "WarMachine", result: "win", score: "3-0" },
        { opponent: "SteelTitan", result: "win", score: "3-1" },
        { opponent: "IronHeart", result: "loss", score: "2-3" }
    ]
};

router.get("/profile", authenticateToken, (req, res) => {
    res.json(mockUserData);
});

module.exports = router;

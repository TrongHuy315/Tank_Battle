const express = require('express');
const router = express.Router();
const PageController = require('../controllers/pageController');
const GameController = require('../controllers/gameController');

const pageController = new PageController();
const gameController = new GameController();

// Serve the game page
router.get('/', pageController.game.bind(pageController));

// API routes for game management
router.get('/api/games', gameController.getActiveGames.bind(gameController));
router.post('/api/games', gameController.createGame.bind(gameController));
router.get('/api/games/:gameId', gameController.getGameState.bind(gameController));

module.exports = router;

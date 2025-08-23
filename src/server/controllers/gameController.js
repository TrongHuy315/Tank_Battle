/**
 * Game Controller
 * Handles HTTP requests related to game functionality
 */

const GameService = require('../services/gameService');

class GameController {
  constructor() {
    this.gameService = new GameService();
  }

  /**
   * Get list of active games
   */
  getActiveGames(req, res) {
    try {
      const games = this.gameService.getActiveGames();
      res.json({
        success: true,
        data: games
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve games',
        error: error.message
      });
    }
  }

  /**
   * Create a new game
   */
  createGame(req, res) {
    try {
      const gameId = `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const game = this.gameService.createGame(gameId);
      
      res.json({
        success: true,
        data: game
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to create game',
        error: error.message
      });
    }
  }

  /**
   * Get specific game state
   */
  getGameState(req, res) {
    try {
      const { gameId } = req.params;
      const gameState = this.gameService.getGameState(gameId);
      
      if (!gameState) {
        return res.status(404).json({
          success: false,
          message: 'Game not found'
        });
      }

      res.json({
        success: true,
        data: gameState
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve game state',
        error: error.message
      });
    }
  }
}

module.exports = GameController;

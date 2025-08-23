/**
 * Game Service
 * Handles game logic, player management, and game state updates
 */

const SHARED_CONSTANTS = require('../../shared/constants');

class GameService {
  constructor() {
    this.games = new Map(); // gameId -> gameState
    this.players = new Map(); // socketId -> playerInfo
  }

  /**
   * Create a new game instance
   */
  createGame(gameId) {
    const gameState = {
      id: gameId,
      players: new Map(),
      status: 'waiting', // waiting, playing, finished
      startTime: null,
      endTime: null,
      map: 'default',
      maxPlayers: SHARED_CONSTANTS.GAME_RULES.MAX_PLAYERS
    };

    this.games.set(gameId, gameState);
    return gameState;
  }

  /**
   * Add player to game
   */
  addPlayerToGame(gameId, socketId, playerData) {
    const game = this.games.get(gameId);
    if (!game) {
      throw new Error('Game not found');
    }

    if (game.players.size >= game.maxPlayers) {
      throw new Error(SHARED_CONSTANTS.ERROR_CODES.GAME_FULL);
    }

    const player = {
      socketId,
      id: playerData.id,
      username: playerData.username,
      x: Math.random() * SHARED_CONSTANTS.GAME_RULES.MAP_SIZE.WIDTH,
      y: Math.random() * SHARED_CONSTANTS.GAME_RULES.MAP_SIZE.HEIGHT,
      direction: 0,
      health: 100,
      score: 0,
      state: SHARED_CONSTANTS.PLAYER_STATE.ALIVE,
      joinedAt: Date.now()
    };

    game.players.set(socketId, player);
    this.players.set(socketId, { gameId, player });

    return player;
  }

  /**
   * Remove player from game
   */
  removePlayerFromGame(socketId) {
    const playerInfo = this.players.get(socketId);
    if (!playerInfo) return null;

    const game = this.games.get(playerInfo.gameId);
    if (game) {
      game.players.delete(socketId);
      
      // Clean up empty games
      if (game.players.size === 0) {
        this.games.delete(playerInfo.gameId);
      }
    }

    this.players.delete(socketId);
    return playerInfo;
  }

  /**
   * Update player position
   */
  updatePlayerPosition(socketId, x, y, direction) {
    const playerInfo = this.players.get(socketId);
    if (!playerInfo) return null;

    const player = playerInfo.player;
    player.x = x;
    player.y = y;
    player.direction = direction;

    return player;
  }

  /**
   * Get game state for broadcasting
   */
  getGameState(gameId) {
    const game = this.games.get(gameId);
    if (!game) return null;

    return {
      id: game.id,
      status: game.status,
      players: Array.from(game.players.values()),
      timestamp: Date.now()
    };
  }

  /**
   * Get all active games
   */
  getActiveGames() {
    return Array.from(this.games.values());
  }
}

module.exports = GameService;

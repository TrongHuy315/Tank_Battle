/**
 * Shared constants used by both client and server
 * Contains networking, game rules, and other shared configurations
 */

const SHARED_CONSTANTS = {
  // Network events
  SOCKET_EVENTS: {
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',
    JOIN_GAME: 'join_game',
    LEAVE_GAME: 'leave_game',
    PLAYER_MOVE: 'player_move',
    PLAYER_SHOOT: 'player_shoot',
    GAME_STATE_UPDATE: 'game_state_update',
    PLAYER_DIED: 'player_died',
    GAME_OVER: 'game_over'
  },

  // Game rules
  GAME_RULES: {
    MAX_PLAYERS: 4,
    GAME_DURATION: 300000, // 5 minutes in milliseconds
    RESPAWN_TIME: 3000, // 3 seconds
    MAP_SIZE: {
      WIDTH: 1200,
      HEIGHT: 800
    }
  },

  // Player states
  PLAYER_STATE: {
    ALIVE: 'alive',
    DEAD: 'dead',
    RESPAWNING: 'respawning',
    SPECTATING: 'spectating'
  },

  // Error codes
  ERROR_CODES: {
    GAME_FULL: 'GAME_FULL',
    INVALID_MOVE: 'INVALID_MOVE',
    NOT_AUTHENTICATED: 'NOT_AUTHENTICATED'
  }
};

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SHARED_CONSTANTS;
} else if (typeof window !== 'undefined') {
  window.SHARED_CONSTANTS = SHARED_CONSTANTS;
}

/**
 * Game constants
 * Contains all game-related constants for Tank Battle game
 */

const Constants = {
  // Direction constants
  DIRECTION: {
    UP: 0,
    RIGHT: 90,
    DOWN: 180,
    LEFT: 270
  },

  // Tank types
  TANK_TYPE: {
    PLAYER: 'player',
    ENEMY: 'enemy',
    BOSS: 'boss'
  },

  // Weapon types
  WEAPON_TYPE: {
    STANDARD: 'standard',
    SHOTGUN: 'shotgun',
    MISSILE: 'missile',
    LASER: 'laser'
  },

  // Tile types
  TILE_TYPE: {
    EMPTY: 0,
    WALL: 1,
    BREAKABLE: 2,
    WATER: 3,
    BUSH: 4
  },

  // Power-up types
  POWER_UP: {
    HEALTH: 'health',
    SHIELD: 'shield',
    SPEED: 'speed',
    WEAPON: 'weapon',
    AMMO: 'ammo'
  },
  
  // Game events
  EVENT: {
    PLAYER_DAMAGE: 'player_damage',
    ENEMY_KILLED: 'enemy_killed',
    POWER_UP_COLLECTED: 'power_up_collected',
    LEVEL_COMPLETE: 'level_complete',
    GAME_OVER: 'game_over'
  }
};

// Export for use in other modules
if (typeof module !== 'undefined') {
  module.exports = Constants;
}

/**
 * Game configuration constants
 */

const GameConfig = {
  // Display settings
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 600,
  FPS_CAP: 60,
  
  // Map settings
  DEFAULT_MAP_WIDTH: 20,
  DEFAULT_MAP_HEIGHT: 15,
  DEFAULT_TILE_SIZE: 40,
  
  // Game states
  GAME_STATE: {
    LOADING: 0,
    MENU: 1,
    PLAYING: 2,
    PAUSED: 3,
    GAME_OVER: 4
  },
  
  // Entity settings
  PLAYER_TANK: {
    SPEED: 100,
    ROTATION_SPEED: 180,
    FIRE_RATE: 1,
    MAX_HEALTH: 100,
    BULLET_SPEED: 300,
    BULLET_DAMAGE: 25
  },
  
  ENEMY_TANK: {
    SPEED: 70,
    ROTATION_SPEED: 120,
    FIRE_RATE: 0.5,
    MAX_HEALTH: 80,
    BULLET_SPEED: 250,
    BULLET_DAMAGE: 20
  },
  
  // Difficulty settings
  DIFFICULTY: {
    EASY: {
      ENEMY_COUNT: 3,
      ENEMY_FIRE_RATE_MULTIPLIER: 0.5,
      ENEMY_SPEED_MULTIPLIER: 0.8
    },
    MEDIUM: {
      ENEMY_COUNT: 5,
      ENEMY_FIRE_RATE_MULTIPLIER: 1.0,
      ENEMY_SPEED_MULTIPLIER: 1.0
    },
    HARD: {
      ENEMY_COUNT: 8,
      ENEMY_FIRE_RATE_MULTIPLIER: 1.5,
      ENEMY_SPEED_MULTIPLIER: 1.2
    }
  },
  
  // Controls
  CONTROLS: {
    MOVE_UP: 'ArrowUp',
    MOVE_DOWN: 'ArrowDown',
    MOVE_LEFT: 'ArrowLeft',
    MOVE_RIGHT: 'ArrowRight',
    FIRE: 'Space',
    PAUSE: 'Escape',
    
    ALT_MOVE_UP: 'KeyW',
    ALT_MOVE_DOWN: 'KeyS',
    ALT_MOVE_LEFT: 'KeyA',
    ALT_MOVE_RIGHT: 'KeyD'
  }
};

/**
 * Utility functions for Tank Battle game
 */

// Math utils
/**
 * Converts degrees to radians
 * @param {number} degrees - Angle in degrees
 * @returns {number} - Angle in radians
 */
function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

/**
 * Converts radians to degrees
 * @param {number} radians - Angle in radians
 * @returns {number} - Angle in degrees
 */
function radiansToDegrees(radians) {
  return radians * 180 / Math.PI;
}

/**
 * Clamp a value between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} - Clamped value
 */
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Get a random integer between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} - Random integer
 */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Get a random float between min and max
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} - Random float
 */
function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Linear interpolation between two values
 * @param {number} a - Start value
 * @param {number} b - End value
 * @param {number} t - Interpolation factor (0-1)
 * @returns {number} - Interpolated value
 */
function lerp(a, b, t) {
  return a + (b - a) * t;
}

// Array utils
/**
 * Shuffle array in place
 * @param {Array} array - Array to shuffle
 * @returns {Array} - Shuffled array (same reference)
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Color utils
/**
 * Convert RGB to hex color
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {string} - Hex color
 */
function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 * Parse hex color to RGB
 * @param {string} hex - Hex color string
 * @returns {Object} - {r, g, b} values (0-255)
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Export utils
const Utils = {
  degreesToRadians,
  radiansToDegrees,
  clamp,
  randomInt,
  randomFloat,
  lerp,
  shuffleArray,
  rgbToHex,
  hexToRgb
};


/**
 * Renderer module for Tank Battle game
 * Handles drawing objects to the canvas
 */

class Renderer {
  /**
   * Create a new renderer
   * @param {HTMLCanvasElement} canvas - The canvas element to render on
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
  }
  
  /**
   * Clear the canvas
   */
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
  
  /**
   * Fill the canvas with a color
   * @param {string} color - Fill color
   */
  fill(color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
  
  /**
   * Draw a rectangle
   * @param {number} x - X position
   * @param {number} y - Y position
   * @param {number} width - Width
   * @param {number} height - Height
   * @param {string} color - Fill color
   * @param {boolean} centered - Whether position is center of rectangle
   */
  drawRect(x, y, width, height, color, centered = false) {
    this.ctx.fillStyle = color;
    
    if (centered) {
      this.ctx.fillRect(x - width / 2, y - height / 2, width, height);
    } else {
      this.ctx.fillRect(x, y, width, height);
    }
  }
  
  /**
   * Draw a circle
   * @param {number} x - X position (center)
   * @param {number} y - Y position (center)
   * @param {number} radius - Circle radius
   * @param {string} color - Fill color
   */
  drawCircle(x, y, radius, color) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }
  
  /**
   * Draw an image
   * @param {Image} image - Image to draw
   * @param {number} x - X position
   * @param {number} y - Y position
   * @param {number} width - Width
   * @param {number} height - Height
   * @param {boolean} centered - Whether position is center of image
   */
  drawImage(image, x, y, width, height, centered = false) {
    if (centered) {
      this.ctx.drawImage(image, x - width / 2, y - height / 2, width, height);
    } else {
      this.ctx.drawImage(image, x, y, width, height);
    }
  }
  
  /**
   * Draw text
   * @param {string} text - Text to draw
   * @param {number} x - X position
   * @param {number} y - Y position
   * @param {string} color - Text color
   * @param {string} font - Font style
   * @param {string} align - Text alignment
   */
  drawText(text, x, y, color, font = '16px Arial', align = 'left') {
    this.ctx.fillStyle = color;
    this.ctx.font = font;
    this.ctx.textAlign = align;
    this.ctx.fillText(text, x, y);
  }
  
  /**
   * Save the current drawing state
   */
  save() {
    this.ctx.save();
  }
  
  /**
   * Restore the previous drawing state
   */
  restore() {
    this.ctx.restore();
  }
  
  /**
   * Translate the origin
   * @param {number} x - X translation
   * @param {number} y - Y translation
   */
  translate(x, y) {
    this.ctx.translate(x, y);
  }
  
  /**
   * Rotate the canvas
   * @param {number} angle - Angle in radians
   */
  rotate(angle) {
    this.ctx.rotate(angle);
  }
  
  /**
   * Get the canvas context
   * @returns {CanvasRenderingContext2D}
   */
  getContext() {
    return this.ctx;
  }
}


/**
 * Input handler for Tank Battle game
 * Manages keyboard, mouse and touch input
 */

class InputHandler {
  constructor() {
    this.keys = {};
    this.mousePosition = { x: 0, y: 0 };
    this.mouseButtons = { left: false, middle: false, right: false };
    this.previousKeys = {};
    
    // Set up event listeners
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('keyup', this.handleKeyUp.bind(this));
    window.addEventListener('mousemove', this.handleMouseMove.bind(this));
    window.addEventListener('mousedown', this.handleMouseDown.bind(this));
    window.addEventListener('mouseup', this.handleMouseUp.bind(this));
    window.addEventListener('contextmenu', (e) => e.preventDefault());
  }
  
  /**
   * Handle key down events
   * @param {KeyboardEvent} e - Keyboard event
   */
  handleKeyDown(e) {
    this.keys[e.code] = true;
    
    // Prevent default for arrow keys and space to avoid page scrolling
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
      e.preventDefault();
    }
  }
  
  /**
   * Handle key up events
   * @param {KeyboardEvent} e - Keyboard event
   */
  handleKeyUp(e) {
    this.keys[e.code] = false;
  }
  
  /**
   * Handle mouse move events
   * @param {MouseEvent} e - Mouse event
   */
  handleMouseMove(e) {
    this.mousePosition.x = e.clientX;
    this.mousePosition.y = e.clientY;
  }
  
  /**
   * Handle mouse down events
   * @param {MouseEvent} e - Mouse event
   */
  handleMouseDown(e) {
    switch (e.button) {
      case 0:
        this.mouseButtons.left = true;
        break;
      case 1:
        this.mouseButtons.middle = true;
        break;
      case 2:
        this.mouseButtons.right = true;
        break;
    }
  }
  
  /**
   * Handle mouse up events
   * @param {MouseEvent} e - Mouse event
   */
  handleMouseUp(e) {
    switch (e.button) {
      case 0:
        this.mouseButtons.left = false;
        break;
      case 1:
        this.mouseButtons.middle = false;
        break;
      case 2:
        this.mouseButtons.right = false;
        break;
    }
  }
  
  /**
   * Check if a key is pressed
   * @param {string} code - Key code
   * @returns {boolean} - Whether the key is pressed
   */
  isKeyPressed(code) {
    return !!this.keys[code];
  }
  
  /**
   * Check if a key was just pressed (not held down)
   * @param {string} code - Key code
   * @returns {boolean} - Whether the key was just pressed
   */
  isKeyJustPressed(code) {
    const justPressed = !this.previousKeys[code] && !!this.keys[code];
    return justPressed;
  }
  
  /**
   * Check if a mouse button is pressed
   * @param {string} button - Button name ('left', 'middle', 'right')
   * @returns {boolean} - Whether the button is pressed
   */
  isMouseButtonPressed(button) {
    return !!this.mouseButtons[button];
  }
  
  /**
   * Get mouse position
   * @returns {Object} - {x, y} coordinates
   */
  getMousePosition() {
    return { ...this.mousePosition };
  }
  
  /**
   * Update input state (should be called at end of each frame)
   */
  update() {
    // Store current key state for next frame comparison
    this.previousKeys = { ...this.keys };
  }
  
  /**
   * Clean up event listeners
   */
  destroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }
}


/**
 * Physics system for Tank Battle game
 * Handles collision detection and response
 */

class Physics {
  constructor() {
    // Store the most recent collision for debugging
    this.lastCollision = null;
  }
  
  /**
   * Check if two rectangles overlap
   * @param {Object} rect1 - {x, y, width, height} of first rectangle
   * @param {Object} rect2 - {x, y, width, height} of second rectangle
   * @returns {boolean} - True if rectangles overlap
   */
  static rectsOverlap(rect1, rect2) {
    return !(
      rect1.x > rect2.x + rect2.width ||
      rect1.x + rect1.width < rect2.x ||
      rect1.y > rect2.y + rect2.height ||
      rect1.y + rect1.height < rect2.y
    );
  }
  
  /**
   * Check if a point is inside a rectangle
   * @param {Object} point - {x, y} coordinates
   * @param {Object} rect - {x, y, width, height} of rectangle
   * @returns {boolean} - True if point is inside rectangle
   */
  static pointInRect(point, rect) {
    return (
      point.x >= rect.x &&
      point.x <= rect.x + rect.width &&
      point.y >= rect.y &&
      point.y <= rect.y + rect.height
    );
  }
  
  /**
   * Calculate distance between two points
   * @param {Object} point1 - {x, y} coordinates
   * @param {Object} point2 - {x, y} coordinates
   * @returns {number} - Distance between points
   */
  static getDistance(point1, point2) {
    return Math.sqrt(
      Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
    );
  }
  
  /**
   * Resolve collision between two rectangular objects
   * @param {Object} obj1 - First object with {x, y, width, height}
   * @param {Object} obj2 - Second object with {x, y, width, height}
   * @returns {Object} - {x, y} push vector for obj1
   */
  static resolveCollision(obj1, obj2) {
    // Calculate overlap on each axis
    const overlapX = Math.min(
      obj1.x + obj1.width - obj2.x,
      obj2.x + obj2.width - obj1.x
    );
    
    const overlapY = Math.min(
      obj1.y + obj1.height - obj2.y,
      obj2.y + obj2.height - obj1.y
    );
    
    // Push in direction of minimum overlap
    if (overlapX < overlapY) {
      // Push horizontally
      if (obj1.x < obj2.x) {
        return { x: -overlapX, y: 0 };
      } else {
        return { x: overlapX, y: 0 };
      }
    } else {
      // Push vertically
      if (obj1.y < obj2.y) {
        return { x: 0, y: -overlapY };
      } else {
        return { x: 0, y: overlapY };
      }
    }
  }
}


/**
 * Asset manager for Tank Battle game
 * Handles loading and storing all game assets
 */

class AssetManager {
  constructor() {
    this.images = {};
    this.sounds = {};
    this.data = {};
    this.totalAssets = 0;
    this.loadedAssets = 0;
    this.onComplete = null;
  }

  /**
   * Load image assets
   * @param {Object} imagesList - key-value pairs of image ID and path
   */
  loadImages(imagesList) {
    for (const [key, src] of Object.entries(imagesList)) {
      this.totalAssets++;
      
      const img = new Image();
      img.src = src;
      
      img.onload = () => {
        this.loadedAssets++;
        this.checkAllLoaded();
      };
      
      img.onerror = () => {
        console.error(`Failed to load image: ${src}`);
        this.loadedAssets++;
        this.checkAllLoaded();
      };
      
      this.images[key] = img;
    }
  }
  
  /**
   * Load audio assets
   * @param {Object} audioList - key-value pairs of audio ID and path
   */
  loadAudio(audioList) {
    for (const [key, src] of Object.entries(audioList)) {
      this.totalAssets++;
      
      const audio = new Audio();
      audio.src = src;
      
      audio.oncanplaythrough = () => {
        this.loadedAssets++;
        this.checkAllLoaded();
      };
      
      audio.onerror = () => {
        console.error(`Failed to load audio: ${src}`);
        this.loadedAssets++;
        this.checkAllLoaded();
      };
      
      this.sounds[key] = audio;
    }
  }
  
  /**
   * Load JSON data
   * @param {Object} dataList - key-value pairs of data ID and path
   */
  loadData(dataList) {
    for (const [key, src] of Object.entries(dataList)) {
      this.totalAssets++;
      
      fetch(src)
        .then(response => response.json())
        .then(data => {
          this.data[key] = data;
          this.loadedAssets++;
          this.checkAllLoaded();
        })
        .catch(error => {
          console.error(`Failed to load data: ${src}`, error);
          this.loadedAssets++;
          this.checkAllLoaded();
        });
    }
  }

  /**
   * Get image by key
   * @param {string} key - Image identifier
   * @returns {Image} - HTML Image element
   */
  getImage(key) {
    return this.images[key];
  }
  
  /**
   * Get audio by key
   * @param {string} key - Audio identifier
   * @returns {Audio} - HTML Audio element
   */
  getAudio(key) {
    return this.sounds[key];
  }
  
  /**
   * Play sound
   * @param {string} key - Sound identifier
   * @param {number} volume - Volume (0-1)
   * @param {boolean} loop - Whether to loop the sound
   */
  playSound(key, volume = 1, loop = false) {
    const sound = this.sounds[key];
    if (sound) {
      sound.volume = volume;
      sound.loop = loop;
      sound.currentTime = 0;
      sound.play().catch(e => console.error('Error playing sound:', e));
    }
  }
  
  /**
   * Stop sound
   * @param {string} key - Sound identifier
   */
  stopSound(key) {
    const sound = this.sounds[key];
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }
  
  /**
   * Get data by key
   * @param {string} key - Data identifier
   * @returns {Object} - JSON data
   */
  getData(key) {
    return this.data[key];
  }
  
  /**
   * Check if all assets are loaded
   */
  checkAllLoaded() {
    if (this.loadedAssets === this.totalAssets && this.onComplete) {
      this.onComplete();
    }
  }
  
  /**
   * Set callback for when all assets are loaded
   * @param {Function} callback - Function to call when assets are loaded
   */
  setOnComplete(callback) {
    this.onComplete = callback;
    
    // If assets already loaded, call callback immediately
    if (this.loadedAssets === this.totalAssets && this.totalAssets > 0) {
      callback();
    }
  }
}


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


/**
 * Asset manager for Tank Battle game
 * Handles loading and storing all game assets
 */

class AssetManager {
  constructor() {
    this.images = {};
    this.sounds = {};
    this.totalAssets = 0;
    this.loadedAssets = 0;
    this.onComplete = null;
  }

  /**
   * Load image assets
   * @param {Object} imagesList - key-value pairs of image ID and path
   */
  loadImages(imagesList) {
    for (const [key, src] of Object.entries(imagesList)) {
      this.totalAssets++;
      
      const img = new Image();
      img.src = src;
      
      img.onload = () => {
        this.loadedAssets++;
        this.checkAllLoaded();
      };
      
      img.onerror = () => {
        console.error(`Failed to load image: ${src}`);
        this.loadedAssets++;
        this.checkAllLoaded();
      };
      
      this.images[key] = img;
    }
  }

  /**
   * Get image by key
   * @param {string} key - Image identifier
   * @returns {Image} - HTML Image element
   */
  getImage(key) {
    return this.images[key];
  }
  
  /**
   * Check if all assets are loaded
   */
  checkAllLoaded() {
    if (this.loadedAssets === this.totalAssets && this.onComplete) {
      this.onComplete();
    }
  }
  
  /**
   * Set callback for when all assets are loaded
   * @param {Function} callback - Function to call when assets are loaded
   */
  setOnComplete(callback) {
    this.onComplete = callback;
    
    // If assets already loaded, call callback immediately
    if (this.loadedAssets === this.totalAssets && this.totalAssets > 0) {
      callback();
    }
  }
}

// Create and export asset manager instance
const assetManager = new AssetManager();

// TODO: Add sound loading and management
// TODO: Add asset preloading for different game levels
// TODO: Add sprite sheet support for animations


/**
 * Map handling for Tank Battle game
 */

class GameMap {
  /**
   * Create a new game map
   * @param {number} width - Width of the map in tiles
   * @param {number} height - Height of the map in tiles
   * @param {number} tileSize - Size of each tile in pixels
   */
  constructor(width, height, tileSize) {
    this.width = width;
    this.height = height;
    this.tileSize = tileSize;
    this.tiles = [];
    this.obstacles = [];
    
    // Initialize empty map
    this.initEmptyMap();
  }
  
  /**
   * Initialize an empty map
   */
  initEmptyMap() {
    // Create a 2D array filled with 0 (empty tiles)
    this.tiles = Array(this.height).fill().map(() => Array(this.width).fill(0));
    
    // Add walls around the map
    this.addBoundaryWalls();
  }
  
  /**
   * Add walls around the map boundary
   */
  addBoundaryWalls() {
    // Top and bottom walls
    for (let x = 0; x < this.width; x++) {
      this.tiles[0][x] = 1; // Top wall
      this.tiles[this.height - 1][x] = 1; // Bottom wall
    }
    
    // Left and right walls
    for (let y = 0; y < this.height; y++) {
      this.tiles[y][0] = 1; // Left wall
      this.tiles[y][this.width - 1] = 1; // Right wall
    }
  }
  
  /**
   * Load a map from a 2D array
   * @param {Array<Array<number>>} mapData - 2D array of tile values
   */
  loadMap(mapData) {
    if (mapData.length !== this.height || mapData[0].length !== this.width) {
      console.error("Map dimensions don't match");
      return;
    }
    
    this.tiles = mapData;
    this.generateObstacles();
  }
  
  /**
   * Generate obstacle objects from tile data
   */
  generateObstacles() {
    this.obstacles = [];
    
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.tiles[y][x] === 1) { // Wall tile
          this.obstacles.push({
            x: x * this.tileSize,
            y: y * this.tileSize,
            width: this.tileSize,
            height: this.tileSize,
            type: 'wall'
          });
        }
        // Add more obstacle types based on tile values
        // e.g., 2 for water, 3 for trees, etc.
      }
    }
  }
  
  /**
   * Render the map
   * @param {Renderer} renderer - Renderer instance
   */
  render(renderer) {
    const ctx = renderer.getContext();
    
    // Draw the base (grass) layer
    ctx.fillStyle = '#228B22'; // Forest green
    ctx.fillRect(0, 0, this.width * this.tileSize, this.height * this.tileSize);
    
    // Draw tiles
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const tile = this.tiles[y][x];
        
        if (tile === 0) continue; // Empty tile
        
        // Wall tile
        if (tile === 1) {
          ctx.fillStyle = '#808080'; // Gray
          ctx.fillRect(
            x * this.tileSize,
            y * this.tileSize,
            this.tileSize,
            this.tileSize
          );
          
          // Add a simple 3D effect
          ctx.fillStyle = '#A9A9A9'; // Light gray
          ctx.fillRect(
            x * this.tileSize + 2,
            y * this.tileSize + 2,
            this.tileSize - 4,
            this.tileSize - 4
          );
        }
        
        // TODO: Add more tile types and their rendering
      }
    }
  }
  
  /**
   * Check if a position is inside a wall or obstacle
   * @param {number} x - X coordinate to check
   * @param {number} y - Y coordinate to check
   * @returns {boolean} - True if the position is inside a wall
   */
  isWall(x, y) {
    // Convert to tile coordinates
    const tileX = Math.floor(x / this.tileSize);
    const tileY = Math.floor(y / this.tileSize);
    
    // Check if out of bounds
    if (tileX < 0 || tileX >= this.width || tileY < 0 || tileY >= this.height) {
      return true;
    }
    
    // Check if wall tile
    return this.tiles[tileY][tileX] === 1;
  }
  
  /**
   * Get all obstacles on the map
   * @returns {Array<Object>} - Array of obstacle objects
   */
  getObstacles() {
    return this.obstacles;
  }
}


/**
 * Map loader for Tank Battle game
 * Loads and manages different maps
 */

class MapLoader {
  constructor() {
    this.maps = {};
    this.currentMap = null;
  }
  
  /**
   * Load a map from a JSON file
   * @param {string} name - Map name
   * @param {string} path - Path to JSON map file
   * @returns {Promise} - Promise that resolves when map is loaded
   */
  async loadMapFromFile(name, path) {
    try {
      const response = await fetch(path);
      const mapData = await response.json();
      return this.addMap(name, mapData);
    } catch (error) {
      console.error(`Failed to load map ${name} from ${path}:`, error);
      return null;
    }
  }
  
  /**
   * Add a map from data
   * @param {string} name - Map name
   * @param {Object} mapData - Map data object
   * @returns {GameMap} - Created game map
   */
  addMap(name, mapData) {
    if (!mapData.width || !mapData.height || !mapData.tileSize || !mapData.tiles) {
      console.error(`Invalid map data for ${name}`);
      return null;
    }
    
    const map = new GameMap(mapData.width, mapData.height, mapData.tileSize);
    map.loadMap(mapData.tiles);
    
    this.maps[name] = map;
    return map;
  }
  
  /**
   * Get a map by name
   * @param {string} name - Map name
   * @returns {GameMap} - Game map
   */
  getMap(name) {
    return this.maps[name] || null;
  }
  
  /**
   * Set the current map
   * @param {string} name - Map name
   * @returns {GameMap} - The set game map
   */
  setCurrentMap(name) {
    if (!this.maps[name]) {
      console.error(`Map ${name} not found`);
      return null;
    }
    
    this.currentMap = this.maps[name];
    return this.currentMap;
  }
  
  /**
   * Get the current map
   * @returns {GameMap} - Current game map
   */
  getCurrentMap() {
    return this.currentMap;
  }
  
  /**
   * Create a default map
   * @param {number} width - Map width in tiles
   * @param {number} height - Map height in tiles
   * @param {number} tileSize - Tile size in pixels
   * @returns {GameMap} - Created game map
   */
  createDefaultMap(width = 20, height = 15, tileSize = 40) {
    const map = new GameMap(width, height, tileSize);
    
    // Add some random walls
    for (let i = 0; i < 30; i++) {
      const x = Utils.randomInt(2, width - 3);
      const y = Utils.randomInt(2, height - 3);
      map.tiles[y][x] = 1;
    }
    
    // Regenerate obstacles
    map.generateObstacles();
    
    this.maps['default'] = map;
    this.currentMap = map;
    
    return map;
  }
}


/**
 * Bullet entity for Tank Battle game
 */

class Bullet {
  /**
   * Create a new bullet
   * @param {number} x - Initial X position
   * @param {number} y - Initial Y position
   * @param {number} angle - Angle of movement in degrees
   * @param {number} speed - Speed of bullet movement
   * @param {number} damage - Damage inflicted by bullet
   * @param {Object} owner - Tank that fired this bullet
   */
  constructor(x, y, angle, speed, damage, owner) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = speed;
    this.damage = damage;
    this.owner = owner;
    this.active = true;
    this.radius = 3; // Bullet radius in pixels
    
    // Calculate velocity based on angle
    const radians = Utils.degreesToRadians(angle);
    this.vx = Math.cos(radians) * speed;
    this.vy = Math.sin(radians) * speed;
  }
  
  /**
   * Update bullet position
   * @param {number} deltaTime - Time since last update in seconds
   */
  update(deltaTime) {
    if (!this.active) return;
    
    // Move bullet
    this.x += this.vx * deltaTime;
    this.y += this.vy * deltaTime;
  }
  
  /**
   * Render bullet
   * @param {Renderer} renderer - Renderer instance
   */
  render(renderer) {
    if (!this.active) return;
    
    // Draw bullet
    renderer.drawCircle(this.x, this.y, this.radius, '#FFFF00');
    
    // Optional: Add a trail effect
    renderer.drawCircle(
      this.x - this.vx * 0.1,
      this.y - this.vy * 0.1,
      this.radius * 0.7,
      'rgba(255, 255, 0, 0.5)'
    );
  }
  
  /**
   * Get collision box for bullet
   * @returns {Object} - Collision box {x, y, width, height}
   */
  getCollisionBox() {
    return {
      x: this.x - this.radius,
      y: this.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2
    };
  }
  
  /**
   * Deactivate bullet (when it hits something)
   */
  deactivate() {
    this.active = false;
  }
}

/**
 * Manages all bullets in the game
 */
class BulletManager {
  constructor() {
    this.bullets = [];
  }
  
  /**
   * Add a new bullet
   * @param {Bullet} bullet - Bullet to add
   */
  addBullet(bullet) {
    this.bullets.push(bullet);
  }
  
  /**
   * Update all bullets
   * @param {number} deltaTime - Time since last update in seconds
   * @param {GameMap} gameMap - Game map for collision checking
   * @param {Array<Tank>} tanks - Tanks to check for collisions
   */
  update(deltaTime, gameMap, tanks) {
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i];
      
      // Skip inactive bullets
      if (!bullet.active) {
        this.bullets.splice(i, 1);
        continue;
      }
      
      // Update bullet position
      bullet.update(deltaTime);
      
      // Check for map boundary collision
      if (bullet.x < 0 || bullet.x > gameMap.width * gameMap.tileSize ||
          bullet.y < 0 || bullet.y > gameMap.height * gameMap.tileSize) {
        bullet.deactivate();
        continue;
      }
      
      // Check for wall collision
      if (gameMap.isWall(bullet.x, bullet.y)) {
        bullet.deactivate();
        continue;
      }
      
      // Check for tank collision
      const bulletBox = bullet.getCollisionBox();
      for (const tank of tanks) {
        // Don't let tanks hit themselves with bullets
        if (tank === bullet.owner) continue;
        
        const tankBox = tank.getCollisionBox();
        if (Physics.rectsOverlap(bulletBox, tankBox)) {
          tank.takeDamage(bullet.damage);
          bullet.deactivate();
          break;
        }
      }
    }
    
    // Remove inactive bullets
    this.bullets = this.bullets.filter(bullet => bullet.active);
  }
  
  /**
   * Render all bullets
   * @param {Renderer} renderer - Renderer instance
   */
  render(renderer) {
    for (const bullet of this.bullets) {
      bullet.render(renderer);
    }
  }
  
  /**
   * Clear all bullets
   */
  clear() {
    this.bullets = [];
  }
}


/**
 * Tank entity for Tank Battle game
 */

class Tank {
  /**
   * Create a new tank
   * @param {number} x - Initial X position
   * @param {number} y - Initial Y position
   * @param {number} direction - Initial direction in degrees
   * @param {string} color - Tank color
   * @param {boolean} isPlayer - Whether this tank is controlled by the player
   */
  constructor(x, y, direction, color, isPlayer = false) {
    // Position and movement
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.speed = 100; // Pixels per second
    this.rotationSpeed = 180; // Degrees per second
    this.width = 30;
    this.height = 40;
    
    // Visuals
    this.color = color;
    this.isPlayer = isPlayer;
    
    // Game state
    this.health = 100;
    this.maxHealth = 100;
    this.alive = true;
    this.score = 0;
    
    // Weapons
    this.fireRate = 1; // Shots per second
    this.fireTimer = 0; // Time since last shot
    this.bulletSpeed = 200; // Pixels per second
    this.bulletDamage = 20;
    
    // Movement state
    this.moving = false;
    this.turning = 0; // -1 = left, 0 = not turning, 1 = right
  }
  
  /**
   * Update tank state
   * @param {number} deltaTime - Time since last update in seconds
   * @param {GameMap} gameMap - Game map for collision detection
   * @param {BulletManager} bulletManager - Bullet manager for firing bullets
   * @param {Array<Tank>} tanks - Other tanks for collision detection
   */
  update(deltaTime, gameMap, bulletManager, tanks) {
    if (!this.alive) return;
    
    // Update fire timer
    if (this.fireTimer > 0) {
      this.fireTimer -= deltaTime;
    }
    
    // Handle rotation
    if (this.turning !== 0) {
      const rotationAmount = this.turning * this.rotationSpeed * deltaTime;
      this.direction = (this.direction + rotationAmount) % 360;
      if (this.direction < 0) this.direction += 360;
    }
    
    // Handle movement
    if (this.moving) {
      const radians = Utils.degreesToRadians(this.direction);
      const nextX = this.x + Math.cos(radians) * this.speed * deltaTime;
      const nextY = this.y + Math.sin(radians) * this.speed * deltaTime;
      
      // Check for collision with map
      if (!this.checkMapCollision(nextX, nextY, gameMap)) {
        // Check for collision with other tanks
        if (!this.checkTankCollision(nextX, nextY, tanks)) {
          this.x = nextX;
          this.y = nextY;
        }
      }
    }
  }
  
  /**
   * Check for collision with map
   * @param {number} nextX - Next X position
   * @param {number} nextY - Next Y position
   * @param {GameMap} gameMap - Game map for collision detection
   * @returns {boolean} - True if collision detected
   */
  checkMapCollision(nextX, nextY, gameMap) {
    // Check collision at tank corners
    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;
    
    // Check all four corners
    const corners = [
      { x: nextX - halfWidth, y: nextY - halfHeight }, // Top-left
      { x: nextX + halfWidth, y: nextY - halfHeight }, // Top-right
      { x: nextX - halfWidth, y: nextY + halfHeight }, // Bottom-left
      { x: nextX + halfWidth, y: nextY + halfHeight }  // Bottom-right
    ];
    
    // If any corner is in a wall, collision detected
    for (const corner of corners) {
      if (gameMap.isWall(corner.x, corner.y)) {
        return true;
      }
    }
    
    return false;
  }
  
  /**
   * Check for collision with other tanks
   * @param {number} nextX - Next X position
   * @param {number} nextY - Next Y position
   * @param {Array<Tank>} tanks - Other tanks for collision detection
   * @returns {boolean} - True if collision detected
   */
  checkTankCollision(nextX, nextY, tanks) {
    // Skip if no other tanks
    if (!tanks || tanks.length <= 1) return false;
    
    const myBox = {
      x: nextX - this.width / 2,
      y: nextY - this.height / 2,
      width: this.width,
      height: this.height
    };
    
    for (const otherTank of tanks) {
      // Skip self
      if (otherTank === this) continue;
      // Skip dead tanks
      if (!otherTank.alive) continue;
      
      const otherBox = otherTank.getCollisionBox();
      
      if (Physics.rectsOverlap(myBox, otherBox)) {
        return true;
      }
    }
    
    return false;
  }
  
  /**
   * Render the tank
   * @param {Renderer} renderer - Renderer instance
   */
  render(renderer) {
    if (!this.alive) return;
    
    const ctx = renderer.getContext();
    ctx.save();
    
    // Move to tank position and rotate
    ctx.translate(this.x, this.y);
    ctx.rotate(Utils.degreesToRadians(this.direction));
    
    // Draw tank body
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    
    // Draw tank turret
    ctx.fillStyle = this.isPlayer ? '#00FFFF' : '#FF0000';
    ctx.fillRect(-this.width / 4, -this.height / 2 - 8, this.width / 2, this.height / 2);
    
    // Draw tank barrel
    ctx.fillStyle = '#333';
    ctx.fillRect(-3, -this.height / 2 - 15, 6, 15);
    
    ctx.restore();
    
    // Draw health bar above tank
    this.renderHealthBar(renderer);
  }
  
  /**
   * Render tank health bar
   * @param {Renderer} renderer - Renderer instance
   */
  renderHealthBar(renderer) {
    const barWidth = 30;
    const barHeight = 4;
    const barX = this.x - barWidth / 2;
    const barY = this.y - this.height / 2 - 10;
    
    // Background
    renderer.drawRect(barX, barY, barWidth, barHeight, '#333');
    
    // Health
    const healthPercent = this.health / this.maxHealth;
    const healthColor = healthPercent > 0.6 ? '#00FF00' : healthPercent > 0.3 ? '#FFFF00' : '#FF0000';
    renderer.drawRect(barX, barY, barWidth * healthPercent, barHeight, healthColor);
  }
  
  /**
   * Get collision box for tank
   * @returns {Object} - Collision box {x, y, width, height}
   */
  getCollisionBox() {
    return {
      x: this.x - this.width / 2,
      y: this.y - this.height / 2,
      width: this.width,
      height: this.height
    };
  }
  
  /**
   * Start moving the tank
   */
  startMoving() {
    this.moving = true;
  }
  
  /**
   * Stop moving the tank
   */
  stopMoving() {
    this.moving = false;
  }
  
  /**
   * Start turning the tank
   * @param {number} direction - Direction to turn (-1 for left, 1 for right)
   */
  startTurning(direction) {
    this.turning = direction;
  }
  
  /**
   * Stop turning the tank
   */
  stopTurning() {
    this.turning = 0;
  }
  
  /**
   * Fire a bullet
   * @param {BulletManager} bulletManager - Bullet manager to add bullet to
   * @returns {boolean} - True if bullet was fired
   */
  fire(bulletManager) {
    if (!this.alive || this.fireTimer > 0) return false;
    
    // Reset fire timer
    this.fireTimer = 1 / this.fireRate;
    
    // Calculate bullet spawn position (at the end of barrel)
    const radians = Utils.degreesToRadians(this.direction);
    const spawnDistance = this.height / 2 + 15;
    const bulletX = this.x + Math.cos(radians) * spawnDistance;
    const bulletY = this.y + Math.sin(radians) * spawnDistance;
    
    // Create new bullet
    const bullet = new Bullet(
      bulletX,
      bulletY,
      this.direction,
      this.bulletSpeed,
      this.bulletDamage,
      this
    );
    
    // Add bullet to manager
    bulletManager.addBullet(bullet);
    
    return true;
  }
  
  /**
   * Tank takes damage
   * @param {number} damage - Amount of damage to take
   * @returns {boolean} - True if tank died from this damage
   */
  takeDamage(damage) {
    if (!this.alive) return false;
    
    this.health -= damage;
    
    if (this.health <= 0) {
      this.health = 0;
      this.alive = false;
      return true;
    }
    
    return false;
  }
  
  /**
   * Reset tank state
   * @param {number} x - New X position
   * @param {number} y - New Y position
   * @param {number} direction - New direction
   */
  reset(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.health = this.maxHealth;
    this.alive = true;
    this.moving = false;
    this.turning = 0;
    this.fireTimer = 0;
  }
}


/**
 * Heads-up Display (HUD) for Tank Battle game
 * Manages and renders the game UI elements like health bar, score, ammo count, etc.
 */

class HUD {
  constructor(game) {
    this.game = game;
  }

  /**
   * Update HUD elements
   * @param {number} deltaTime - Time elapsed since last update
   */
  update(deltaTime) {
    // Update animation timers, flashers, etc.
  }

  /**
   * Render HUD elements
   * @param {Renderer} renderer - Renderer instance
   */
  render(renderer) {
    this.renderHealthBar(renderer);
    this.renderScore(renderer);
    this.renderAmmo(renderer);
    this.renderMinimap(renderer);
  }

  /**
   * Render player health bar
   * @param {Renderer} renderer - Renderer instance
   */
  renderHealthBar(renderer) {
    const player = this.game.player;
    if (!player) return;

    // Background
    renderer.fillRect(20, 20, 200, 20, '#333333');
    
    // Health bar
    const healthWidth = (player.health / player.maxHealth) * 196;
    const healthColor = this.getHealthColor(player.health / player.maxHealth);
    renderer.fillRect(22, 22, healthWidth, 16, healthColor);
    
    // Health text
    renderer.drawText(`${player.health}/${player.maxHealth}`, 120, 30, 
                      '#ffffff', '14px Arial', 'center', 'middle');
  }

  /**
   * Render player score
   * @param {Renderer} renderer - Renderer instance
   */
  renderScore(renderer) {
    const score = this.game.player ? this.game.player.score : 0;
    renderer.drawText(`Score: ${score}`, GameConfig.CANVAS_WIDTH - 20, 30, 
                      '#ffffff', '18px Arial', 'right', 'middle');
  }

  /**
   * Render ammo counter
   * @param {Renderer} renderer - Renderer instance
   */
  renderAmmo(renderer) {
    // TODO: Implement ammo counter when ammunition system is added
  }

  /**
   * Render minimap
   * @param {Renderer} renderer - Renderer instance
   */
  renderMinimap(renderer) {
    // TODO: Implement minimap
  }

  /**
   * Get appropriate color for health bar based on percentage
   * @param {number} healthPercent - Health percentage (0-1)
   * @returns {string} - Color in hex or rgba format
   */
  getHealthColor(healthPercent) {
    if (healthPercent > 0.6) return '#2ecc71'; // Green
    if (healthPercent > 0.3) return '#f39c12'; // Orange
    return '#e74c3c'; // Red
  }
}


/**
 * Game scene base class
 * All game scenes inherit from this class
 */

class Scene {
  constructor(game) {
    this.game = game;
    this.isActive = false;
  }
  
  /**
   * Initialize the scene
   */
  init() {
    this.isActive = true;
  }
  
  /**
   * Update the scene
   * @param {number} deltaTime - Time elapsed since last update
   */
  update(deltaTime) {
    // Override in subclass
  }
  
  /**
   * Render the scene
   * @param {Renderer} renderer - Renderer instance
   */
  render(renderer) {
    // Override in subclass
  }
  
  /**
   * Handle input
   * @param {InputHandler} input - Input handler
   */
  handleInput(input) {
    // Override in subclass
  }
  
  /**
   * Clean up resources when scene is deactivated
   */
  cleanup() {
    this.isActive = false;
  }
}


/**
 * Menu scene for Tank Battle game
 */

class MenuScene extends Scene {
  constructor(game) {
    super(game);
    
    // Menu options
    this.options = [
      { text: 'Start Game', action: () => this.game.startGame() },
      { text: 'How to Play', action: () => this.game.showInstructions() },
      { text: 'Options', action: () => this.game.showOptions() },
      { text: 'Credits', action: () => this.game.showCredits() }
    ];
    
    this.selectedOption = 0;
  }
  
  /**
   * Initialize menu scene
   */
  init() {
    super.init();
    this.selectedOption = 0;
  }
  
  /**
   * Update menu scene
   * @param {number} deltaTime - Time elapsed since last update
   */
  update(deltaTime) {
    // Nothing to update in the menu scene
  }
  
  /**
   * Render menu scene
   * @param {Renderer} renderer - Renderer instance
   */
  render(renderer) {
    // Clear canvas
    renderer.fill('#1a1a1a');
    
    // Draw title
    renderer.drawText('TANK BATTLE', GameConfig.CANVAS_WIDTH / 2, 120, 
                     '#0f0', '48px Orbitron, sans-serif', 'center');
    
    // Draw menu options
    for (let i = 0; i < this.options.length; i++) {
      const option = this.options[i];
      const y = 250 + i * 50;
      
      // Highlight selected option
      const color = i === this.selectedOption ? '#00ff00' : '#ffffff';
      const prefix = i === this.selectedOption ? '> ' : '';
      
      renderer.drawText(`${prefix}${option.text}`, GameConfig.CANVAS_WIDTH / 2, y, 
                       color, '24px Orbitron, sans-serif', 'center');
    }
    
    // Draw footer
    renderer.drawText('Use Arrow Keys to Navigate, Enter to Select', 
                     GameConfig.CANVAS_WIDTH / 2, GameConfig.CANVAS_HEIGHT - 50, 
                     '#999', '16px Orbitron, sans-serif', 'center');
  }
  
  /**
   * Handle input for menu scene
   * @param {InputHandler} input - Input handler
   */
  handleInput(input) {
    if (!this.isActive) return;
    
    // Navigate menu
    if (input.isKeyJustPressed('ArrowUp')) {
      this.selectedOption = (this.selectedOption - 1 + this.options.length) % this.options.length;
    } else if (input.isKeyJustPressed('ArrowDown')) {
      this.selectedOption = (this.selectedOption + 1) % this.options.length;
    }
    
    // Select option
    if (input.isKeyJustPressed('Enter')) {
      const selectedOption = this.options[this.selectedOption];
      if (selectedOption && typeof selectedOption.action === 'function') {
        selectedOption.action();
      }
    }
  }
}


/**
 * Game scene - Main gameplay scene
 */

class GameScene extends Scene {
  constructor(game) {
    super(game);
    
    // Game objects
    this.map = null;
    this.player = null;
    this.enemies = [];
    this.bulletManager = new BulletManager();
    
    // Game state
    this.level = 1;
    this.isPaused = false;
  }
  
  /**
   * Initialize the game scene
   */
  init() {
    super.init();
    
    // Create map
    const mapLoader = new MapLoader();
    this.map = mapLoader.createDefaultMap(
      GameConfig.DEFAULT_MAP_WIDTH,
      GameConfig.DEFAULT_MAP_HEIGHT,
      GameConfig.DEFAULT_TILE_SIZE
    );
    
    // Create player tank
    const playerX = this.map.tileSize * 2;
    const playerY = this.map.tileSize * 2;
    this.player = new Tank(playerX, playerY, 0, '#3498db', true);
    
    // Apply player config
    this.player.speed = GameConfig.PLAYER_TANK.SPEED;
    this.player.rotationSpeed = GameConfig.PLAYER_TANK.ROTATION_SPEED;
    this.player.fireRate = GameConfig.PLAYER_TANK.FIRE_RATE;
    this.player.bulletSpeed = GameConfig.PLAYER_TANK.BULLET_SPEED;
    this.player.bulletDamage = GameConfig.PLAYER_TANK.BULLET_DAMAGE;
    
    // Create enemies
    this.createEnemies();
    
    // Reset bullet manager
    this.bulletManager.clear();
  }
  
  /**
   * Create enemy tanks
   */
  createEnemies() {
    this.enemies = [];
    
    // Get difficulty settings
    const difficulty = GameConfig.DIFFICULTY.MEDIUM;
    const enemyCount = difficulty.ENEMY_COUNT;
    
    // Create enemies at random positions
    for (let i = 0; i < enemyCount; i++) {
      const x = Utils.randomInt(3, this.map.width - 3) * this.map.tileSize;
      const y = Utils.randomInt(3, this.map.height - 3) * this.map.tileSize;
      const direction = Utils.randomInt(0, 3) * 90;
      
      // Create enemy with random color
      const colors = ['#e74c3c', '#e67e22', '#9b59b6', '#f1c40f'];
      const color = colors[i % colors.length];
      
      const enemy = new Tank(x, y, direction, color);
      
      // Apply enemy config with difficulty modifiers
      enemy.speed = GameConfig.ENEMY_TANK.SPEED * difficulty.ENEMY_SPEED_MULTIPLIER;
      enemy.rotationSpeed = GameConfig.ENEMY_TANK.ROTATION_SPEED;
      enemy.fireRate = GameConfig.ENEMY_TANK.FIRE_RATE * difficulty.ENEMY_FIRE_RATE_MULTIPLIER;
      enemy.bulletSpeed = GameConfig.ENEMY_TANK.BULLET_SPEED;
      enemy.bulletDamage = GameConfig.ENEMY_TANK.BULLET_DAMAGE;
      
      // Avoid spawning on walls or other tanks
      if (!this.map.isWall(x, y) && !this.checkTankCollisions(enemy)) {
        this.enemies.push(enemy);
      } else {
        // Try again with a different position
        i--;
      }
    }
  }
  
  /**
   * Check if a tank collides with any other tank
   * @param {Tank} tank - Tank to check
   * @returns {boolean} - True if collision detected
   */
  checkTankCollisions(tank) {
    const tankBox = tank.getCollisionBox();
    
    // Check against player
    if (this.player) {
      const playerBox = this.player.getCollisionBox();
      if (Physics.rectsOverlap(tankBox, playerBox)) {
        return true;
      }
    }
    
    // Check against other enemies
    for (const enemy of this.enemies) {
      const enemyBox = enemy.getCollisionBox();
      if (tank !== enemy && Physics.rectsOverlap(tankBox, enemyBox)) {
        return true;
      }
    }
    
    return false;
  }
  
  /**
   * Update the game scene
   * @param {number} deltaTime - Time elapsed since last update
   */
  update(deltaTime) {
    if (!this.isActive || this.isPaused) return;
    
    // Update player
    if (this.player.alive) {
      this.player.update(deltaTime, this.map, this.bulletManager, [this.player, ...this.enemies]);
    }
    
    // Update enemies
    for (const enemy of this.enemies) {
      if (enemy.alive) {
        enemy.update(deltaTime, this.map, this.bulletManager, [this.player, ...this.enemies]);
      }
    }
    
    // Update bullets
    this.bulletManager.update(deltaTime, this.map, [this.player, ...this.enemies]);
    
    // Update enemy AI
    this.updateEnemyAI(deltaTime);
    
    // Check for game over
    if (!this.player.alive) {
      this.game.gameOver();
    }
    
    // Check for level complete
    if (this.enemies.every(enemy => !enemy.alive)) {
      this.levelComplete();
    }
  }
  
  /**
   * Render the game scene
   * @param {Renderer} renderer - Renderer instance
   */
  render(renderer) {
    if (!this.isActive) return;
    
    // Clear canvas
    renderer.clear();
    
    // Render map
    this.map.render(renderer);
    
    // Render bullets
    this.bulletManager.render(renderer);
    
    // Render enemies
    for (const enemy of this.enemies) {
      enemy.render(renderer);
    }
    
    // Render player
    if (this.player) {
      this.player.render(renderer);
    }
    
    // Render UI
    this.renderUI(renderer);
    
    // Render pause overlay if paused
    if (this.isPaused) {
      this.renderPauseOverlay(renderer);
    }
  }
  
  /**
   * Render game UI
   * @param {Renderer} renderer - Renderer instance
   */
  renderUI(renderer) {
    // Score
    renderer.drawText(`Score: ${this.player.score}`, 10, 25, 'white', '16px Orbitron, sans-serif');
    
    // Health
    renderer.drawText(`Health: ${this.player.health}`, 10, 50, 'white', '16px Orbitron, sans-serif');
    
    // Enemies left
    const enemiesLeft = this.enemies.filter(enemy => enemy.alive).length;
    renderer.drawText(`Enemies: ${enemiesLeft}`, 10, 75, 'white', '16px Orbitron, sans-serif');
    
    // Level
    renderer.drawText(`Level: ${this.level}`, 10, 100, 'white', '16px Orbitron, sans-serif');
  }
  
  /**
   * Render pause overlay
   * @param {Renderer} renderer - Renderer instance
   */
  renderPauseOverlay(renderer) {
    // Darken screen
    const ctx = renderer.getContext();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, GameConfig.CANVAS_WIDTH, GameConfig.CANVAS_HEIGHT);
    
    // Pause text
    renderer.drawText('PAUSED', GameConfig.CANVAS_WIDTH / 2, GameConfig.CANVAS_HEIGHT / 2, 
                     'white', '32px Orbitron, sans-serif', 'center');
    renderer.drawText('Press ESC to resume', GameConfig.CANVAS_WIDTH / 2, 
                     GameConfig.CANVAS_HEIGHT / 2 + 40, 'white', '16px Orbitron, sans-serif', 'center');
  }
  
  /**
   * Handle input for the game scene
   * @param {InputHandler} input - Input handler
   */
  handleInput(input) {
    if (!this.isActive) return;
    
    // Toggle pause
    if (input.isKeyJustPressed(GameConfig.CONTROLS.PAUSE)) {
      this.isPaused = !this.isPaused;
      return;
    }
    
    if (this.isPaused || !this.player.alive) return;
    
    // Player movement
    if (input.isKeyPressed(GameConfig.CONTROLS.MOVE_UP) || 
        input.isKeyPressed(GameConfig.CONTROLS.ALT_MOVE_UP)) {
      this.player.startMoving();
    } else {
      this.player.stopMoving();
    }
    
    // Player rotation
    if (input.isKeyPressed(GameConfig.CONTROLS.MOVE_LEFT) || 
        input.isKeyPressed(GameConfig.CONTROLS.ALT_MOVE_LEFT)) {
      this.player.startTurning(-1);
    } else if (input.isKeyPressed(GameConfig.CONTROLS.MOVE_RIGHT) || 
               input.isKeyPressed(GameConfig.CONTROLS.ALT_MOVE_RIGHT)) {
      this.player.startTurning(1);
    } else {
      this.player.stopTurning();
    }
    
    // Player fire
    if (input.isKeyPressed(GameConfig.CONTROLS.FIRE)) {
      this.player.fire(this.bulletManager);
    }
  }
  
  /**
   * Update enemy AI
   * @param {number} deltaTime - Time elapsed since last update
   */
  updateEnemyAI(deltaTime) {
    for (const enemy of this.enemies) {
      if (!enemy.alive) continue;
      
      // Simple AI: Random movement and occasional firing
      
      // Every few frames, change behavior (pseudo-random)
      if (Math.random() < 0.01) {
        // 80% chance to move, 20% chance to stop
        if (Math.random() < 0.8) {
          enemy.startMoving();
        } else {
          enemy.stopMoving();
        }
        
        // 50% chance to turn
        if (Math.random() < 0.5) {
          // Equal chance of turning left or right
          enemy.startTurning(Math.random() < 0.5 ? -1 : 1);
        } else {
          enemy.stopTurning();
        }
      }
      
      // Shoot occasionally
      if (Math.random() < 0.02) {
        enemy.fire(this.bulletManager);
      }
    }
  }
  
  /**
   * Handle level completion
   */
  levelComplete() {
    // Increase level
    this.level++;
    
    // Reset player position
    this.player.reset(this.map.tileSize * 2, this.map.tileSize * 2, 0);
    
    // Create new enemies
    this.createEnemies();
    
    // Clear bullets
    this.bulletManager.clear();
  }
  
  /**
   * Toggle pause state
   */
  togglePause() {
    this.isPaused = !this.isPaused;
  }
  
  /**
   * Clean up scene resources
   */
  cleanup() {
    super.cleanup();
    this.bulletManager.clear();
  }
}


/**
 * Game Manager
 * Central controller for the Tank Battle game
 */

class GameManager {
  constructor() {
    // Game state
    this.currentState = GameConfig.GAME_STATE.LOADING;
    
    // Core systems
    this.renderer = new Renderer(document.getElementById('gameCanvas'));
    this.input = new InputHandler();
    this.assets = new AssetManager();
    this.physics = new Physics();
    
    // Game scenes
    this.scenes = {
      menu: new MenuScene(this),
      game: new GameScene(this)
      // Additional scenes can be added here
    };
    
    // Current active scene
    this.activeScene = null;
    
    // Game properties
    this.score = 0;
    this.highScore = this.loadHighScore();
    
    // Initialize the game
    this.init();
  }
  
  /**
   * Initialize the game
   */
  init() {
    // Load game assets
    this.loadAssets();
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Start with menu scene
    this.setScene('menu');
    
    // Start game loop
    this.lastFrameTime = 0;
    requestAnimationFrame(this.gameLoop.bind(this));
  }
  
  /**
   * Load all game assets
   */
  loadAssets() {
    // Define assets to load
    const assets = {
      images: {
        'tank_player': '../images/game/tank_player.png',
        'tank_enemy': '../images/game/tank_enemy.png',
        'bullet': '../images/game/bullet.png',
        'tiles': '../images/game/tiles.png',
      },
      audio: {
        'shot': '../audio/shot.wav',
        'explosion': '../audio/explosion.wav',
        'powerup': '../audio/powerup.wav',
      }
    };
    
    // Set callback for when loading completes
    this.assets.onComplete = () => {
      console.log('All assets loaded');
      // If we're still in LOADING state, move to MENU
      if (this.currentState === GameConfig.GAME_STATE.LOADING) {
        this.setState(GameConfig.GAME_STATE.MENU);
      }
    };
    
    // Start loading assets
    this.assets.loadImages(assets.images);
    this.assets.loadAudio(assets.audio);
  }
  
  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Input events are handled by InputHandler
    
    // Add any additional event listeners here
    window.addEventListener('resize', this.handleResize.bind(this));
  }
  
  /**
   * Handle window resize
   */
  handleResize() {
    // Adjust canvas size if needed
    this.renderer.resizeCanvas();
  }
  
  /**
   * Game loop
   * @param {number} timestamp - Current time in milliseconds
   */
  gameLoop(timestamp) {
    // Calculate delta time in seconds
    const deltaTime = (timestamp - this.lastFrameTime) / 1000;
    this.lastFrameTime = timestamp;
    
    // Cap delta time to avoid large jumps
    const cappedDelta = Math.min(deltaTime, 0.1);
    
    // Update and render the game
    this.update(cappedDelta);
    this.render();
    
    // Process input after frame is complete
    this.input.update();
    
    // Continue the game loop
    requestAnimationFrame(this.gameLoop.bind(this));
  }
  
  /**
   * Update game state
   * @param {number} deltaTime - Time elapsed since last update
   */
  update(deltaTime) {
    // Update active scene if available
    if (this.activeScene) {
      this.activeScene.update(deltaTime);
    }
  }
  
  /**
   * Render game
   */
  render() {
    // Clear the canvas
    this.renderer.clear();
    
    // Render active scene if available
    if (this.activeScene) {
      this.activeScene.render(this.renderer);
    }
  }
  
  /**
   * Set game state
   * @param {number} newState - New game state from GameConfig.GAME_STATE
   */
  setState(newState) {
    const oldState = this.currentState;
    this.currentState = newState;
    
    // Handle state transition
    switch (newState) {
      case GameConfig.GAME_STATE.MENU:
        this.setScene('menu');
        break;
        
      case GameConfig.GAME_STATE.PLAYING:
        this.setScene('game');
        break;
        
      case GameConfig.GAME_STATE.GAME_OVER:
        this.handleGameOver();
        break;
    }
    
    console.log(`Game state changed from ${oldState} to ${newState}`);
  }
  
  /**
   * Set active scene
   * @param {string} sceneName - Name of the scene to activate
   */
  setScene(sceneName) {
    // Deactivate current scene if any
    if (this.activeScene) {
      this.activeScene.deactivate();
    }
    
    // Set and activate new scene
    this.activeScene = this.scenes[sceneName];
    
    if (this.activeScene) {
      this.activeScene.activate();
    } else {
      console.error(`Scene '${sceneName}' not found`);
    }
  }
  
  /**
   * Start a new game
   */
  startGame() {
    this.score = 0;
    this.setState(GameConfig.GAME_STATE.PLAYING);
  }
  
  /**
   * Handle game over
   */
  handleGameOver() {
    // Check for high score
    if (this.score > this.highScore) {
      this.highScore = this.score;
      this.saveHighScore();
    }
    
    // TODO: Show game over screen
  }
  
  /**
   * Show instructions
   */
  showInstructions() {
    // TODO: Implement instructions scene
    console.log('Instructions not implemented yet');
  }
  
  /**
   * Show options
   */
  showOptions() {
    // TODO: Implement options scene
    console.log('Options not implemented yet');
  }
  
  /**
   * Show credits
   */
  showCredits() {
    // TODO: Implement credits scene
    console.log('Credits not implemented yet');
  }
  
  /**
   * Load high score from local storage
   * @returns {number} - High score value
   */
  loadHighScore() {
    const savedScore = localStorage.getItem('tankBattle_highScore');
    return savedScore ? parseInt(savedScore, 10) : 0;
  }
  
  /**
   * Save high score to local storage
   */
  saveHighScore() {
    localStorage.setItem('tankBattle_highScore', this.highScore.toString());
  }
}


/**
 * Main game logic for Tank Battle game
 */

// Game state enum
const GAME_STATE = {
  LOADING: 0,
  MENU: 1,
  PLAYING: 2,
  PAUSED: 3,
  GAME_OVER: 4
};

class Game {
  constructor() {
    // Get canvas and context
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    
    // Set initial game state
    this.state = GAME_STATE.LOADING;
    
    // Game objects
    this.map = null;
    this.player = null;
    this.enemies = [];
    this.bulletManager = new BulletManager();
    this.collisionManager = new CollisionManager();
    
    // Game settings
    this.mapWidth = 20;
    this.mapHeight = 15;
    this.tileSize = 40;
    
    // Time tracking
    this.lastFrameTime = 0;
    this.deltaTime = 0;
    
    // Input handling
    this.keys = {};
    
    // Initialize game
    this.init();
  }
  
  /**
   * Initialize the game
   */
  init() {
    // Set canvas size
    this.canvas.width = this.mapWidth * this.tileSize;
    this.canvas.height = this.mapHeight * this.tileSize;
    
    // Load assets
    this.loadAssets();
    
    // Set up input handlers
    this.setupInput();
  }
  
  /**
   * Load game assets
   */
  loadAssets() {
    // Define assets to load
    const images = {
      'tank_player': '../images/game/tank_player.png',
      'tank_enemy': '../images/game/tank_enemy.png',
      'bullet': '../images/game/bullet.png',
      // Add more assets here
    };
    
    // For now, proceed without waiting for assets since we're drawing with basic shapes
    // In the future, use assetManager.loadImages(images) and wait for completion
    
    // Initialize game objects
    this.initGame();
  }
  
  /**
   * Initialize game objects
   */
  initGame() {
    // Create map
    this.map = new GameMap(this.mapWidth, this.mapHeight, this.tileSize);
    
    // Create player tank
    const playerX = this.tileSize * 2;
    const playerY = this.tileSize * 2;
    this.player = new Tank(playerX, playerY, 0, '#3498db', true);
    
    // Create some enemy tanks
    this.enemies = [];
    this.enemies.push(new Tank(this.tileSize * 17, this.tileSize * 2, 180, '#e74c3c'));
    this.enemies.push(new Tank(this.tileSize * 17, this.tileSize * 12, 180, '#e67e22'));
    this.enemies.push(new Tank(this.tileSize * 10, this.tileSize * 7, 270, '#9b59b6'));
    
    // Set game state to playing
    this.state = GAME_STATE.PLAYING;
    
    // Start game loop
    requestAnimationFrame(this.gameLoop.bind(this));
  }
  
  /**
   * Set up input event handlers
   */
  setupInput() {
    // Keyboard events
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      
      // Prevent default for arrow keys and space to avoid page scrolling
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
      }
    });
    
    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });
  }
  
  /**
   * Main game loop
   * @param {number} timestamp - Current timestamp
   */
  gameLoop(timestamp) {
    // Calculate delta time
    if (this.lastFrameTime === 0) {
      this.lastFrameTime = timestamp;
    }
    this.deltaTime = (timestamp - this.lastFrameTime) / 1000; // in seconds
    this.lastFrameTime = timestamp;
    
    // Limit delta time to prevent issues after tab switch
    if (this.deltaTime > 0.1) this.deltaTime = 0.1;
    
    // Update and render based on game state
    switch (this.state) {
      case GAME_STATE.PLAYING:
        this.update();
        this.render();
        break;
      
      case GAME_STATE.PAUSED:
        this.renderPauseScreen();
        break;
      
      case GAME_STATE.GAME_OVER:
        this.renderGameOverScreen();
        break;
      
      case GAME_STATE.MENU:
        this.renderMenuScreen();
        break;
      
      default:
        break;
    }
    
    // Continue game loop
    requestAnimationFrame(this.gameLoop.bind(this));
  }
  
  /**
   * Update game state
   */
  update() {
    // Handle player input
    this.handleInput();
    
    // Update all tanks
    const allTanks = [this.player, ...this.enemies];
    
    for (const tank of allTanks) {
      if (tank.alive) {
        tank.update(this.deltaTime, this.map, this.bulletManager, allTanks);
      }
    }
    
    // Update bullets
    this.bulletManager.update(this.deltaTime, this.map, allTanks);
    
    // Handle collisions
    this.collisionManager.handleCollisions(allTanks, this.bulletManager.bullets, this.map);
    
    // Check for game over condition
    if (!this.player.alive) {
      this.state = GAME_STATE.GAME_OVER;
    }
    
    // Check for win condition
    if (this.enemies.every(enemy => !enemy.alive)) {
      // For now, just reset the game
      this.resetGame();
    }
    
    // Update enemy AI
    this.updateEnemyAI();
  }
  
  /**
   * Handle player input
   */
  handleInput() {
    // Movement
    if (this.keys['ArrowUp'] || this.keys['KeyW']) {
      this.player.startMoving();
    } else {
      this.player.stopMoving();
    }
    
    // Rotation
    if (this.keys['ArrowLeft'] || this.keys['KeyA']) {
      this.player.startTurning(-1);
    } else if (this.keys['ArrowRight'] || this.keys['KeyD']) {
      this.player.startTurning(1);
    } else {
      this.player.stopTurning();
    }
    
    // Fire
    if (this.keys['Space']) {
      this.player.fire(this.bulletManager);
    }
    
    // Pause
    if (this.keys['Escape'] && !this.escapePressed) {
      if (this.state === GAME_STATE.PLAYING) {
        this.state = GAME_STATE.PAUSED;
      } else if (this.state === GAME_STATE.PAUSED) {
        this.state = GAME_STATE.PLAYING;
      }
      this.escapePressed = true;
    } else if (!this.keys['Escape']) {
      this.escapePressed = false;
    }
  }
  
  /**
   * Update enemy AI
   * Simple AI that moves toward player and shoots when in line
   */
  updateEnemyAI() {
    for (const enemy of this.enemies) {
      if (!enemy.alive) continue;
      
      // Every few frames, change behavior (pseudo-random)
      if (Math.random() < 0.01) {
        // 80% chance to move, 20% chance to stop
        if (Math.random() < 0.8) {
          enemy.startMoving();
        } else {
          enemy.stopMoving();
        }
        
        // 50% chance to turn
        if (Math.random() < 0.5) {
          // Equal chance of turning left or right
          enemy.startTurning(Math.random() < 0.5 ? -1 : 1);
        } else {
          enemy.stopTurning();
        }
      }
      
      // Shoot occasionally
      if (Math.random() < 0.02) {
        enemy.fire(this.bulletManager);
      }
    }
  }
  
  /**
   * Render the game
   */
  render() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Render map
    this.map.render(this.ctx);
    
    // Render bullets
    this.bulletManager.render(this.ctx);
    
    // Render all tanks
    for (const enemy of this.enemies) {
      enemy.render(this.ctx);
    }
    this.player.render(this.ctx);
    
    // Render UI
    this.renderUI();
  }
  
  /**
   * Render UI elements
   */
  renderUI() {
    // Score
    this.ctx.fillStyle = 'white';
    this.ctx.font = '16px Orbitron, sans-serif';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(`Score: ${this.player.score}`, 10, 25);
    
    // Health
    this.ctx.fillText(`Health: ${this.player.health}`, 10, 50);
    
    // Enemies left
    const enemiesLeft = this.enemies.filter(enemy => enemy.alive).length;
    this.ctx.fillText(`Enemies: ${enemiesLeft}`, 10, 75);
  }
  
  /**
   * Render pause screen
   */
  renderPauseScreen() {
    // Darken the screen
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw pause text
    this.ctx.fillStyle = 'white';
    this.ctx.font = '32px Orbitron, sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('PAUSED', this.canvas.width / 2, this.canvas.height / 2);
    
    this.ctx.font = '16px Orbitron, sans-serif';
    this.ctx.fillText('Press ESC to resume', this.canvas.width / 2, this.canvas.height / 2 + 40);
  }
  
  /**
   * Render game over screen
   */
  renderGameOverScreen() {
    // Darken the screen
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw game over text
    this.ctx.fillStyle = 'red';
    this.ctx.font = '48px Orbitron, sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 40);
    
    this.ctx.fillStyle = 'white';
    this.ctx.font = '24px Orbitron, sans-serif';
    this.ctx.fillText(`Score: ${this.player.score}`, this.canvas.width / 2, this.canvas.height / 2 + 20);
    
    this.ctx.font = '18px Orbitron, sans-serif';
    this.ctx.fillText('Click to restart', this.canvas.width / 2, this.canvas.height / 2 + 60);
    
    // Add event listener for restart
    if (!this.restartListener) {
      this.restartListener = () => {
        this.resetGame();
        this.canvas.removeEventListener('click', this.restartListener);
        this.restartListener = null;
      };
      this.canvas.addEventListener('click', this.restartListener);
    }
  }
  
  /**
   * Render menu screen
   */
  renderMenuScreen() {
    // To be implemented
  }
  
  /**
   * Reset the game
   */
  resetGame() {
    // Reset player
    this.player.reset(this.tileSize * 2, this.tileSize * 2, 0);
    this.player.score = 0;
    
    // Reset enemies
    this.enemies[0].reset(this.tileSize * 17, this.tileSize * 2, 180);
    this.enemies[1].reset(this.tileSize * 17, this.tileSize * 12, 180);
    this.enemies[2].reset(this.tileSize * 10, this.tileSize * 7, 270);
    
    // Clear bullets
    this.bulletManager.clear();
    
    // Set state to playing
    this.state = GAME_STATE.PLAYING;
  }
}

// Initialize game when page loads
window.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
});

// TODO: Add game menu with options (difficulty, controls)
// TODO: Add support for multiplayer
// TODO: Add levels with different maps and enemy types
// TODO: Add persistent high scores
// TODO: Add sound effects and music
// TODO: Add mobile controls
// TODO: Add power-ups and special abilities



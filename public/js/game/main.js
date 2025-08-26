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
    this.mapWidth = 80;
    this.mapHeight = 60;
    this.tileSize = 10; // Quy ước 1 ô trên ma trận là 100 pixel
    
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
    const playerX = this.tileSize * 3;
    const playerY = this.tileSize * 3;
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

  setMoveDirection(direction) {
    this.moveDirection = direction;
    this.moving = direction !== 0;
  }
  
  /**
   * Handle player input
   */
  handleInput() {
    // Movement
    if (this.keys['ArrowUp'] || this.keys['KeyW']) {
      this.player.startMoving(); // Di chuyển tiến
    } else {
      this.player.stopMoving();
    }
    // if (this.keys['ArrowDown'] || this.keys['KeyS']) {
    //   moveDirection = -1; // Di chuyển lùi
    // }
    // this.player.setMoveDirection(moveDirection)
    
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
    this.player.reset(this.tileSize * 3, this.tileSize * 3, 0);
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

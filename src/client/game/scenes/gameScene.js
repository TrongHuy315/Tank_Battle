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

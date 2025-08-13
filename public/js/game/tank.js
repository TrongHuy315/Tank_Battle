/**
 * Tank class for Tank Battle game
 */

class Tank {
  /**
   * Create a new tank
   * @param {number} x - Initial X position
   * @param {number} y - Initial Y position
   * @param {number} direction - Initial direction (0-3, see DIRECTION in utils.js)
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
      const radians = degreesToRadians(this.direction);
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
      
      if (rectsOverlap(myBox, otherBox)) {
        return true;
      }
    }
    
    return false;
  }
  
  /**
   * Render the tank
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
   */
  render(ctx) {
    if (!this.alive) return;
    
    ctx.save();
    
    // Move to tank position and rotate
    ctx.translate(this.x, this.y);
    ctx.rotate(degreesToRadians(this.direction));
    
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
    this.renderHealthBar(ctx);
  }
  
  /**
   * Render tank health bar
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
   */
  renderHealthBar(ctx) {
    const barWidth = 30;
    const barHeight = 4;
    const barX = this.x - barWidth / 2;
    const barY = this.y - this.height / 2 - 10;
    
    // Background
    ctx.fillStyle = '#333';
    ctx.fillRect(barX, barY, barWidth, barHeight);
    
    // Health
    const healthPercent = this.health / this.maxHealth;
    const healthColor = healthPercent > 0.6 ? '#00FF00' : healthPercent > 0.3 ? '#FFFF00' : '#FF0000';
    ctx.fillStyle = healthColor;
    ctx.fillRect(barX, barY, barWidth * healthPercent, barHeight);
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
    const radians = degreesToRadians(this.direction);
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

// TODO: Add different tank types with varying stats
// TODO: Add tank power-ups (speed boost, shield, etc)
// TODO: Add tank animations for movement, firing, and damage
// TODO: Add tank customization options

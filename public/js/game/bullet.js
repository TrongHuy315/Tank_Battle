/**
 * Bullet handling for Tank Battle game
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
    const adjustAngle = angle - 90;
    const radians = degreesToRadians(adjustAngle);
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
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
   */
  render(ctx) {
    if (!this.active) return;
    
    ctx.fillStyle = '#FFFF00'; // Yellow
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Optional: Add a trail effect
    // ctx.fillStyle = 'rgba(255, 255, 0, 0.5)';
    ctx.beginPath();
    ctx.arc(
      this.x - this.vx * 0.1,
      this.y - this.vy * 0.1,
      this.radius * 0.7,
      0,
      Math.PI * 2
    );
    ctx.fill();
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
  /**
   * @param {Array<Bullet>} bullets - Array of the bullets
   */
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
        if (rectsOverlap(bulletBox, tankBox)) {
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
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
   */
  render(ctx) {
    for (const bullet of this.bullets) {
      bullet.render(ctx);
    }
  }
  
  /**
   * Clear all bullets
   */
  clear() {
    this.bullets = [];
  }
}

// TODO: Add different bullet types (normal, explosive, etc)
// TODO: Add bullet collision effects (explosions, etc)
// TODO: Add bullet penetration through multiple targets

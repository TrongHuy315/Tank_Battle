/**
 * Collision detection and handling for Tank Battle game
 */

class CollisionManager {
  constructor() {
    // Store the most recent collision for debugging
    this.lastCollision = null;
  }
  
  /**
   * Check and handle all collisions in the game
   * @param {Array<Tank>} tanks - All tanks in the game
   * @param {Array<Bullet>} bullets - All bullets in the game
   * @param {GameMap} gameMap - The game map
   */
  handleCollisions(tanks, bullets, gameMap) {
    this.handleTankMapCollisions(tanks, gameMap);
    this.handleTankTankCollisions(tanks);
    this.handleBulletCollisions(bullets, tanks, gameMap);
  }
  
  /**
   * Handle collisions between tanks and map
   * @param {Array<Tank>} tanks - All tanks in the game
   * @param {GameMap} gameMap - The game map
   */
  handleTankMapCollisions(tanks, gameMap) {
    const obstacles = gameMap.getObstacles();
    
    for (const tank of tanks) {
      if (!tank.alive) continue;
      
      const tankBox = tank.getCollisionBox();
      
      // Check each obstacle
      for (const obstacle of obstacles) {
        if (rectsOverlap(tankBox, obstacle)) {
          // Simple collision response - push tank away from obstacle
          this.resolveCollision(tank, obstacle);
          
          this.lastCollision = {
            type: 'tank-obstacle',
            tank: tank,
            obstacle: obstacle,
            time: Date.now()
          };
        }
      }
    }
  }
  
  /**
   * Handle collisions between tanks
   * @param {Array<Tank>} tanks - All tanks in the game
   */
  handleTankTankCollisions(tanks) {
    // Check each pair of tanks
    for (let i = 0; i < tanks.length; i++) {
      const tank1 = tanks[i];
      if (!tank1.alive) continue;
      
      for (let j = i + 1; j < tanks.length; j++) {
        const tank2 = tanks[j];
        if (!tank2.alive) continue;
        
        const box1 = tank1.getCollisionBox();
        const box2 = tank2.getCollisionBox();
        
        if (rectsOverlap(box1, box2)) {
          // Resolve the tank-tank collision
          this.resolveTankTankCollision(tank1, tank2);
          
          this.lastCollision = {
            type: 'tank-tank',
            tank1: tank1,
            tank2: tank2,
            time: Date.now()
          };
        }
      }
    }
  }
  
  /**
   * Handle collisions between bullets and other objects
   * @param {Array<Bullet>} bullets - All bullets in the game
   * @param {Array<Tank>} tanks - All tanks in the game
   * @param {GameMap} gameMap - The game map
   */
  handleBulletCollisions(bullets, tanks, gameMap) {
    for (const bullet of bullets) {
      if (!bullet.active) continue;
      
      const bulletBox = bullet.getCollisionBox();
      
      // Check for bullet-map collisions
      const bulletX = bullet.x;
      const bulletY = bullet.y;
      
      if (gameMap.isWall(bulletX, bulletY)) {
        bullet.deactivate();
        
        this.lastCollision = {
          type: 'bullet-wall',
          bullet: bullet,
          position: { x: bulletX, y: bulletY },
          time: Date.now()
        };
        
        continue;
      }
      
      // Check for bullet-tank collisions
      for (const tank of tanks) {
        if (!tank.alive || tank === bullet.owner) continue;
        
        const tankBox = tank.getCollisionBox();
        
        if (rectsOverlap(bulletBox, tankBox)) {
          // Apply damage to tank
          const killed = tank.takeDamage(bullet.damage);
          bullet.deactivate();
          
          // Award points to bullet owner if tank was killed
          if (killed && bullet.owner) {
            bullet.owner.score += 100;
          }
          
          this.lastCollision = {
            type: 'bullet-tank',
            bullet: bullet,
            tank: tank,
            damage: bullet.damage,
            killed: killed,
            time: Date.now()
          };
          
          break;
        }
      }
    }
  }
  
  /**
   * Resolve collision between tank and obstacle
   * @param {Tank} tank - Tank object
   * @param {Object} obstacle - Obstacle object
   */
  resolveCollision(tank, obstacle) {
    // Calculate overlap on each axis
    const tankBox = tank.getCollisionBox();
    
    const overlapX = Math.min(
      tankBox.x + tankBox.width - obstacle.x,
      obstacle.x + obstacle.width - tankBox.x
    );
    
    const overlapY = Math.min(
      tankBox.y + tankBox.height - obstacle.y,
      obstacle.y + obstacle.height - tankBox.y
    );
    
    // Push in direction of minimum overlap
    if (overlapX < overlapY) {
      // Push horizontally
      if (tankBox.x < obstacle.x) {
        tank.x -= overlapX;
      } else {
        tank.x += overlapX;
      }
    } else {
      // Push vertically
      if (tankBox.y < obstacle.y) {
        tank.y -= overlapY;
      } else {
        tank.y += overlapY;
      }
    }
  }
  
  /**
   * Resolve collision between two tanks
   * @param {Tank} tank1 - First tank
   * @param {Tank} tank2 - Second tank
   */
  resolveTankTankCollision(tank1, tank2) {
    // Calculate vector from tank1 to tank2
    const dx = tank2.x - tank1.x;
    const dy = tank2.y - tank1.y;
    
    // Calculate distance
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Minimum distance before collision
    const minDistance = (tank1.width + tank2.width) / 2;
    
    // Only resolve if tanks are overlapping
    if (distance < minDistance) {
      // Normalized direction vector
      const nx = dx / distance;
      const ny = dy / distance;
      
      // Calculate how much to push each tank
      const pushAmount = (minDistance - distance) / 2;
      
      // Push tanks away from each other
      tank1.x -= nx * pushAmount;
      tank1.y -= ny * pushAmount;
      tank2.x += nx * pushAmount;
      tank2.y += ny * pushAmount;
    }
  }
}

// TODO: Add physics-based collision response for more realistic interactions
// TODO: Add collision effects (smoke, sparks, etc)
// TODO: Add different collision responses for different obstacle types
// TODO: Add collision sound effects

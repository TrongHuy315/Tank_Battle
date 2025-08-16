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

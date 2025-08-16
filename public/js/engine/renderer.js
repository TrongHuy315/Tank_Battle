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

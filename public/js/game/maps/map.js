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

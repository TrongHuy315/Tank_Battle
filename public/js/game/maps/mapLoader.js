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

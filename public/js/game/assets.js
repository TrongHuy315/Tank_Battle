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

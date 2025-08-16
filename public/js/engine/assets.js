/**
 * Asset manager for Tank Battle game
 * Handles loading and storing all game assets
 */

class AssetManager {
  constructor() {
    this.images = {};
    this.sounds = {};
    this.data = {};
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
   * Load audio assets
   * @param {Object} audioList - key-value pairs of audio ID and path
   */
  loadAudio(audioList) {
    for (const [key, src] of Object.entries(audioList)) {
      this.totalAssets++;
      
      const audio = new Audio();
      audio.src = src;
      
      audio.oncanplaythrough = () => {
        this.loadedAssets++;
        this.checkAllLoaded();
      };
      
      audio.onerror = () => {
        console.error(`Failed to load audio: ${src}`);
        this.loadedAssets++;
        this.checkAllLoaded();
      };
      
      this.sounds[key] = audio;
    }
  }
  
  /**
   * Load JSON data
   * @param {Object} dataList - key-value pairs of data ID and path
   */
  loadData(dataList) {
    for (const [key, src] of Object.entries(dataList)) {
      this.totalAssets++;
      
      fetch(src)
        .then(response => response.json())
        .then(data => {
          this.data[key] = data;
          this.loadedAssets++;
          this.checkAllLoaded();
        })
        .catch(error => {
          console.error(`Failed to load data: ${src}`, error);
          this.loadedAssets++;
          this.checkAllLoaded();
        });
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
   * Get audio by key
   * @param {string} key - Audio identifier
   * @returns {Audio} - HTML Audio element
   */
  getAudio(key) {
    return this.sounds[key];
  }
  
  /**
   * Play sound
   * @param {string} key - Sound identifier
   * @param {number} volume - Volume (0-1)
   * @param {boolean} loop - Whether to loop the sound
   */
  playSound(key, volume = 1, loop = false) {
    const sound = this.sounds[key];
    if (sound) {
      sound.volume = volume;
      sound.loop = loop;
      sound.currentTime = 0;
      sound.play().catch(e => console.error('Error playing sound:', e));
    }
  }
  
  /**
   * Stop sound
   * @param {string} key - Sound identifier
   */
  stopSound(key) {
    const sound = this.sounds[key];
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }
  
  /**
   * Get data by key
   * @param {string} key - Data identifier
   * @returns {Object} - JSON data
   */
  getData(key) {
    return this.data[key];
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

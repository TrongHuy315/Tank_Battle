/**
 * Game Manager
 * Central controller for the Tank Battle game
 */

class GameManager {
  constructor() {
    // Game state
    this.currentState = GameConfig.GAME_STATE.LOADING;
    
    // Core systems
    this.renderer = new Renderer(document.getElementById('gameCanvas'));
    this.input = new InputHandler();
    this.assets = new AssetManager();
    this.physics = new Physics();
    
    // Game scenes
    this.scenes = {
      menu: new MenuScene(this),
      game: new GameScene(this)
      // Additional scenes can be added here
    };
    
    // Current active scene
    this.activeScene = null;
    
    // Game properties
    this.score = 0;
    this.highScore = this.loadHighScore();
    
    // Initialize the game
    this.init();
  }
  
  /**
   * Initialize the game
   */
  init() {
    // Load game assets
    this.loadAssets();
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Start with menu scene
    this.setScene('menu');
    
    // Start game loop
    this.lastFrameTime = 0;
    requestAnimationFrame(this.gameLoop.bind(this));
  }
  
  /**
   * Load all game assets
   */
  loadAssets() {
    // Define assets to load
    const assets = {
      images: {
        'tank_player': '../images/game/tank_player.png',
        'tank_enemy': '../images/game/tank_enemy.png',
        'bullet': '../images/game/bullet.png',
        'tiles': '../images/game/tiles.png',
      },
      audio: {
        'shot': '../audio/shot.wav',
        'explosion': '../audio/explosion.wav',
        'powerup': '../audio/powerup.wav',
      }
    };
    
    // Set callback for when loading completes
    this.assets.onComplete = () => {
      console.log('All assets loaded');
      // If we're still in LOADING state, move to MENU
      if (this.currentState === GameConfig.GAME_STATE.LOADING) {
        this.setState(GameConfig.GAME_STATE.MENU);
      }
    };
    
    // Start loading assets
    this.assets.loadImages(assets.images);
    this.assets.loadAudio(assets.audio);
  }
  
  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Input events are handled by InputHandler
    
    // Add any additional event listeners here
    window.addEventListener('resize', this.handleResize.bind(this));
  }
  
  /**
   * Handle window resize
   */
  handleResize() {
    // Adjust canvas size if needed
    this.renderer.resizeCanvas();
  }
  
  /**
   * Game loop
   * @param {number} timestamp - Current time in milliseconds
   */
  gameLoop(timestamp) {
    // Calculate delta time in seconds
    const deltaTime = (timestamp - this.lastFrameTime) / 1000;
    this.lastFrameTime = timestamp;
    
    // Cap delta time to avoid large jumps
    const cappedDelta = Math.min(deltaTime, 0.1);
    
    // Update and render the game
    this.update(cappedDelta);
    this.render();
    
    // Process input after frame is complete
    this.input.update();
    
    // Continue the game loop
    requestAnimationFrame(this.gameLoop.bind(this));
  }
  
  /**
   * Update game state
   * @param {number} deltaTime - Time elapsed since last update
   */
  update(deltaTime) {
    // Update active scene if available
    if (this.activeScene) {
      this.activeScene.update(deltaTime);
    }
  }
  
  /**
   * Render game
   */
  render() {
    // Clear the canvas
    this.renderer.clear();
    
    // Render active scene if available
    if (this.activeScene) {
      this.activeScene.render(this.renderer);
    }
  }
  
  /**
   * Set game state
   * @param {number} newState - New game state from GameConfig.GAME_STATE
   */
  setState(newState) {
    const oldState = this.currentState;
    this.currentState = newState;
    
    // Handle state transition
    switch (newState) {
      case GameConfig.GAME_STATE.MENU:
        this.setScene('menu');
        break;
        
      case GameConfig.GAME_STATE.PLAYING:
        this.setScene('game');
        break;
        
      case GameConfig.GAME_STATE.GAME_OVER:
        this.handleGameOver();
        break;
    }
    
    console.log(`Game state changed from ${oldState} to ${newState}`);
  }
  
  /**
   * Set active scene
   * @param {string} sceneName - Name of the scene to activate
   */
  setScene(sceneName) {
    // Deactivate current scene if any
    if (this.activeScene) {
      this.activeScene.deactivate();
    }
    
    // Set and activate new scene
    this.activeScene = this.scenes[sceneName];
    
    if (this.activeScene) {
      this.activeScene.activate();
    } else {
      console.error(`Scene '${sceneName}' not found`);
    }
  }
  
  /**
   * Start a new game
   */
  startGame() {
    this.score = 0;
    this.setState(GameConfig.GAME_STATE.PLAYING);
  }
  
  /**
   * Handle game over
   */
  handleGameOver() {
    // Check for high score
    if (this.score > this.highScore) {
      this.highScore = this.score;
      this.saveHighScore();
    }
    
    // TODO: Show game over screen
  }
  
  /**
   * Show instructions
   */
  showInstructions() {
    // TODO: Implement instructions scene
    console.log('Instructions not implemented yet');
  }
  
  /**
   * Show options
   */
  showOptions() {
    // TODO: Implement options scene
    console.log('Options not implemented yet');
  }
  
  /**
   * Show credits
   */
  showCredits() {
    // TODO: Implement credits scene
    console.log('Credits not implemented yet');
  }
  
  /**
   * Load high score from local storage
   * @returns {number} - High score value
   */
  loadHighScore() {
    const savedScore = localStorage.getItem('tankBattle_highScore');
    return savedScore ? parseInt(savedScore, 10) : 0;
  }
  
  /**
   * Save high score to local storage
   */
  saveHighScore() {
    localStorage.setItem('tankBattle_highScore', this.highScore.toString());
  }
}

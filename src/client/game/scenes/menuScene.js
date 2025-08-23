/**
 * Menu scene for Tank Battle game
 */

class MenuScene extends Scene {
  constructor(game) {
    super(game);
    
    // Menu options
    this.options = [
      { text: 'Start Game', action: () => this.game.startGame() },
      { text: 'How to Play', action: () => this.game.showInstructions() },
      { text: 'Options', action: () => this.game.showOptions() },
      { text: 'Credits', action: () => this.game.showCredits() }
    ];
    
    this.selectedOption = 0;
  }
  
  /**
   * Initialize menu scene
   */
  init() {
    super.init();
    this.selectedOption = 0;
  }
  
  /**
   * Update menu scene
   * @param {number} deltaTime - Time elapsed since last update
   */
  update(deltaTime) {
    // Nothing to update in the menu scene
  }
  
  /**
   * Render menu scene
   * @param {Renderer} renderer - Renderer instance
   */
  render(renderer) {
    // Clear canvas
    renderer.fill('#1a1a1a');
    
    // Draw title
    renderer.drawText('TANK BATTLE', GameConfig.CANVAS_WIDTH / 2, 120, 
                     '#0f0', '48px Orbitron, sans-serif', 'center');
    
    // Draw menu options
    for (let i = 0; i < this.options.length; i++) {
      const option = this.options[i];
      const y = 250 + i * 50;
      
      // Highlight selected option
      const color = i === this.selectedOption ? '#00ff00' : '#ffffff';
      const prefix = i === this.selectedOption ? '> ' : '';
      
      renderer.drawText(`${prefix}${option.text}`, GameConfig.CANVAS_WIDTH / 2, y, 
                       color, '24px Orbitron, sans-serif', 'center');
    }
    
    // Draw footer
    renderer.drawText('Use Arrow Keys to Navigate, Enter to Select', 
                     GameConfig.CANVAS_WIDTH / 2, GameConfig.CANVAS_HEIGHT - 50, 
                     '#999', '16px Orbitron, sans-serif', 'center');
  }
  
  /**
   * Handle input for menu scene
   * @param {InputHandler} input - Input handler
   */
  handleInput(input) {
    if (!this.isActive) return;
    
    // Navigate menu
    if (input.isKeyJustPressed('ArrowUp')) {
      this.selectedOption = (this.selectedOption - 1 + this.options.length) % this.options.length;
    } else if (input.isKeyJustPressed('ArrowDown')) {
      this.selectedOption = (this.selectedOption + 1) % this.options.length;
    }
    
    // Select option
    if (input.isKeyJustPressed('Enter')) {
      const selectedOption = this.options[this.selectedOption];
      if (selectedOption && typeof selectedOption.action === 'function') {
        selectedOption.action();
      }
    }
  }
}

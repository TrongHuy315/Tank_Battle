/**
 * Game scene base class
 * All game scenes inherit from this class
 */

class Scene {
  constructor(game) {
    this.game = game;
    this.isActive = false;
  }
  
  /**
   * Initialize the scene
   */
  init() {
    this.isActive = true;
  }
  
  /**
   * Update the scene
   * @param {number} deltaTime - Time elapsed since last update
   */
  update(deltaTime) {
    // Override in subclass
  }
  
  /**
   * Render the scene
   * @param {Renderer} renderer - Renderer instance
   */
  render(renderer) {
    // Override in subclass
  }
  
  /**
   * Handle input
   * @param {InputHandler} input - Input handler
   */
  handleInput(input) {
    // Override in subclass
  }
  
  /**
   * Clean up resources when scene is deactivated
   */
  cleanup() {
    this.isActive = false;
  }
}

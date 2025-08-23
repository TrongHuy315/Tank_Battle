/**
 * Input handler for Tank Battle game
 * Manages keyboard, mouse and touch input
 */

class InputHandler {
  constructor() {
    this.keys = {};
    this.mousePosition = { x: 0, y: 0 };
    this.mouseButtons = { left: false, middle: false, right: false };
    this.previousKeys = {};
    
    // Set up event listeners
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('keyup', this.handleKeyUp.bind(this));
    window.addEventListener('mousemove', this.handleMouseMove.bind(this));
    window.addEventListener('mousedown', this.handleMouseDown.bind(this));
    window.addEventListener('mouseup', this.handleMouseUp.bind(this));
    window.addEventListener('contextmenu', (e) => e.preventDefault());
  }
  
  /**
   * Handle key down events
   * @param {KeyboardEvent} e - Keyboard event
   */
  handleKeyDown(e) {
    this.keys[e.code] = true;
    
    // Prevent default for arrow keys and space to avoid page scrolling
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
      e.preventDefault();
    }
  }
  
  /**
   * Handle key up events
   * @param {KeyboardEvent} e - Keyboard event
   */
  handleKeyUp(e) {
    this.keys[e.code] = false;
  }
  
  /**
   * Handle mouse move events
   * @param {MouseEvent} e - Mouse event
   */
  handleMouseMove(e) {
    this.mousePosition.x = e.clientX;
    this.mousePosition.y = e.clientY;
  }
  
  /**
   * Handle mouse down events
   * @param {MouseEvent} e - Mouse event
   */
  handleMouseDown(e) {
    switch (e.button) {
      case 0:
        this.mouseButtons.left = true;
        break;
      case 1:
        this.mouseButtons.middle = true;
        break;
      case 2:
        this.mouseButtons.right = true;
        break;
    }
  }
  
  /**
   * Handle mouse up events
   * @param {MouseEvent} e - Mouse event
   */
  handleMouseUp(e) {
    switch (e.button) {
      case 0:
        this.mouseButtons.left = false;
        break;
      case 1:
        this.mouseButtons.middle = false;
        break;
      case 2:
        this.mouseButtons.right = false;
        break;
    }
  }
  
  /**
   * Check if a key is pressed
   * @param {string} code - Key code
   * @returns {boolean} - Whether the key is pressed
   */
  isKeyPressed(code) {
    return !!this.keys[code];
  }
  
  /**
   * Check if a key was just pressed (not held down)
   * @param {string} code - Key code
   * @returns {boolean} - Whether the key was just pressed
   */
  isKeyJustPressed(code) {
    const justPressed = !this.previousKeys[code] && !!this.keys[code];
    return justPressed;
  }
  
  /**
   * Check if a mouse button is pressed
   * @param {string} button - Button name ('left', 'middle', 'right')
   * @returns {boolean} - Whether the button is pressed
   */
  isMouseButtonPressed(button) {
    return !!this.mouseButtons[button];
  }
  
  /**
   * Get mouse position
   * @returns {Object} - {x, y} coordinates
   */
  getMousePosition() {
    return { ...this.mousePosition };
  }
  
  /**
   * Update input state (should be called at end of each frame)
   */
  update() {
    // Store current key state for next frame comparison
    this.previousKeys = { ...this.keys };
  }
  
  /**
   * Clean up event listeners
   */
  destroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }
}

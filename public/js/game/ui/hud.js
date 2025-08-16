/**
 * Heads-up Display (HUD) for Tank Battle game
 * Manages and renders the game UI elements like health bar, score, ammo count, etc.
 */

class HUD {
  constructor(game) {
    this.game = game;
  }

  /**
   * Update HUD elements
   * @param {number} deltaTime - Time elapsed since last update
   */
  update(deltaTime) {
    // Update animation timers, flashers, etc.
  }

  /**
   * Render HUD elements
   * @param {Renderer} renderer - Renderer instance
   */
  render(renderer) {
    this.renderHealthBar(renderer);
    this.renderScore(renderer);
    this.renderAmmo(renderer);
    this.renderMinimap(renderer);
  }

  /**
   * Render player health bar
   * @param {Renderer} renderer - Renderer instance
   */
  renderHealthBar(renderer) {
    const player = this.game.player;
    if (!player) return;

    // Background
    renderer.fillRect(20, 20, 200, 20, '#333333');
    
    // Health bar
    const healthWidth = (player.health / player.maxHealth) * 196;
    const healthColor = this.getHealthColor(player.health / player.maxHealth);
    renderer.fillRect(22, 22, healthWidth, 16, healthColor);
    
    // Health text
    renderer.drawText(`${player.health}/${player.maxHealth}`, 120, 30, 
                      '#ffffff', '14px Arial', 'center', 'middle');
  }

  /**
   * Render player score
   * @param {Renderer} renderer - Renderer instance
   */
  renderScore(renderer) {
    const score = this.game.player ? this.game.player.score : 0;
    renderer.drawText(`Score: ${score}`, GameConfig.CANVAS_WIDTH - 20, 30, 
                      '#ffffff', '18px Arial', 'right', 'middle');
  }

  /**
   * Render ammo counter
   * @param {Renderer} renderer - Renderer instance
   */
  renderAmmo(renderer) {
    // TODO: Implement ammo counter when ammunition system is added
  }

  /**
   * Render minimap
   * @param {Renderer} renderer - Renderer instance
   */
  renderMinimap(renderer) {
    // TODO: Implement minimap
  }

  /**
   * Get appropriate color for health bar based on percentage
   * @param {number} healthPercent - Health percentage (0-1)
   * @returns {string} - Color in hex or rgba format
   */
  getHealthColor(healthPercent) {
    if (healthPercent > 0.6) return '#2ecc71'; // Green
    if (healthPercent > 0.3) return '#f39c12'; // Orange
    return '#e74c3c'; // Red
  }
}

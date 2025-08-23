// Main client entry point
// This file will be built and served to the browser

// Import engine modules
import './engine/utils.js';
import './engine/renderer.js';
import './engine/input.js';
import './engine/physics.js';
import './engine/assets.js';

// Import game modules
import './game/constants/gameConstants.js';
import './game/config.js';
import './game/assets.js';
import './game/maps/map.js';
import './game/maps/mapLoader.js';
import './game/entities/bullet.js';
import './game/entities/tank.js';
import './game/ui/hud.js';
import './game/scenes/scene.js';
import './game/scenes/menuScene.js';
import './game/scenes/gameScene.js';
import './game/core/gameManager.js';
import './game/main.js';

// Initialize the game
console.log('Tank Battle client loaded');

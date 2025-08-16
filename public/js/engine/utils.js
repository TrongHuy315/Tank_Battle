/**
 * Utility functions for Tank Battle game
 */

// Math utils
/**
 * Converts degrees to radians
 * @param {number} degrees - Angle in degrees
 * @returns {number} - Angle in radians
 */
function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

/**
 * Converts radians to degrees
 * @param {number} radians - Angle in radians
 * @returns {number} - Angle in degrees
 */
function radiansToDegrees(radians) {
  return radians * 180 / Math.PI;
}

/**
 * Clamp a value between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} - Clamped value
 */
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Get a random integer between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} - Random integer
 */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Get a random float between min and max
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} - Random float
 */
function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Linear interpolation between two values
 * @param {number} a - Start value
 * @param {number} b - End value
 * @param {number} t - Interpolation factor (0-1)
 * @returns {number} - Interpolated value
 */
function lerp(a, b, t) {
  return a + (b - a) * t;
}

// Array utils
/**
 * Shuffle array in place
 * @param {Array} array - Array to shuffle
 * @returns {Array} - Shuffled array (same reference)
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Color utils
/**
 * Convert RGB to hex color
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {string} - Hex color
 */
function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 * Parse hex color to RGB
 * @param {string} hex - Hex color string
 * @returns {Object} - {r, g, b} values (0-255)
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Export utils
const Utils = {
  degreesToRadians,
  radiansToDegrees,
  clamp,
  randomInt,
  randomFloat,
  lerp,
  shuffleArray,
  rgbToHex,
  hexToRgb
};

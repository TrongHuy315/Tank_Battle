/**
 * Utility functions for Tank Battle game
 */

// Constants
const DIRECTION = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3
};

/**
 * Converts degrees to radians
 * @param {number} degrees - Angle in degrees
 * @returns {number} - Angle in radians
 */
function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

/**
 * Calculates distance between two points
 * @param {Object} point1 - {x, y} coordinates
 * @param {Object} point2 - {x, y} coordinates
 * @returns {number} - Distance between points
 */
function getDistance(point1, point2) {
    return Math.sqrt(
        Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
    );
}

/**
 * Checks if a point is inside a rectangle
 * @param {Object} point - {x, y} coordinates
 * @param {Object} rect - {x, y, width, height} of rectangle
 * @returns {boolean} - True if point is inside rectangle
 */
function pointInRect(point, rect) {
    return (
        point.x >= rect.x &&
        point.x <= rect.x + rect.width &&
        point.y >= rect.y &&
        point.y <= rect.y + rect.height
    );
}

/**
 * Checks if two rectangles overlap
 * @param {Object} rect1 - {x, y, width, height} of first rectangle
 * @param {Object} rect2 - {x, y, width, height} of second rectangle
 * @returns {boolean} - True if rectangles overlap
 */
function rectsOverlap(rect1, rect2) {
    return !(
        rect1.x > rect2.x + rect2.width ||
        rect1.x + rect1.width < rect2.x ||
        rect1.y > rect2.y + rect2.height ||
        rect1.y + rect1.height < rect2.y
    );
}

// TODO: Add more utility functions for game mechanics
// TODO: Add vector math for advanced movement and physics
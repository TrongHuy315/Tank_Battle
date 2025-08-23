#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('Building client JavaScript...');

// Ensure dist directory exists
const distDir = path.join(__dirname, 'public', 'js', 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Game bundle files in correct order
const gameFiles = [
    // Engine files
    'src/client/engine/utils.js',
    'src/client/engine/renderer.js',
    'src/client/engine/input.js',
    'src/client/engine/physics.js',
    'src/client/engine/assets.js',
    
    // Game files
    'src/client/game/constants/gameConstants.js',
    'src/client/game/config.js',
    'src/client/game/assets.js',
    'src/client/game/maps/map.js',
    'src/client/game/maps/mapLoader.js',
    'src/client/game/entities/bullet.js',
    'src/client/game/entities/tank.js',
    'src/client/game/ui/hud.js',
    'src/client/game/scenes/scene.js',
    'src/client/game/scenes/menuScene.js',
    'src/client/game/scenes/gameScene.js',
    'src/client/game/core/gameManager.js',
    'src/client/game/main.js'
];

// UI files
const uiFiles = [
    'src/client/ui/home.js',
    'src/client/ui/introduction.js',
    'src/client/ui/login.js',
    'src/client/ui/profile.js',
    'src/client/ui/register.js'
];

// Build game bundle
function buildGameBundle() {
    let bundleContent = '';
    
    for (const file of gameFiles) {
        const filePath = path.join(__dirname, file);
        if (fs.existsSync(filePath)) {
            bundleContent += fs.readFileSync(filePath, 'utf8') + '\n\n';
        } else {
            console.warn(`Warning: File not found - ${file}`);
        }
    }
    
    const outputPath = path.join(distDir, 'game.bundle.js');
    fs.writeFileSync(outputPath, bundleContent);
    console.log('✓ Game bundle created: public/js/dist/game.bundle.js');
}

// Copy UI files
function copyUIFiles() {
    for (const file of uiFiles) {
        const filePath = path.join(__dirname, file);
        const fileName = path.basename(file);
        const outputPath = path.join(distDir, fileName);
        
        if (fs.existsSync(filePath)) {
            fs.copyFileSync(filePath, outputPath);
            console.log(`✓ Copied: public/js/dist/${fileName}`);
        } else {
            console.warn(`Warning: File not found - ${file}`);
        }
    }
}

// Create a simple initialization file for the game
function createGameInit() {
    const initContent = `
// Game initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('Tank Battle game loaded');
    
    // Check if we're on the game page
    if (document.getElementById('gameCanvas')) {
        console.log('Initializing game...');
        // Game initialization will be handled by the bundled game code
    }
});
`;
    
    const initPath = path.join(distDir, 'game-init.js');
    fs.writeFileSync(initPath, initContent);
    console.log('✓ Game initialization file created');
}

// Run build process
try {
    buildGameBundle();
    copyUIFiles();
    createGameInit();
    console.log('\n🎉 Client JavaScript built successfully!');
} catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
}

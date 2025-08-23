#!/bin/bash
# Build script to concatenate client JavaScript files

echo "Building client JavaScript..."

# Create output file
OUTPUT_FILE="public/js/dist/game.bundle.js"
echo "" > $OUTPUT_FILE

# Add engine files in correct order
cat src/client/engine/utils.js >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE
cat src/client/engine/renderer.js >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE
cat src/client/engine/input.js >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE
cat src/client/engine/physics.js >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE
cat src/client/engine/assets.js >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

# Add game files in correct order
cat src/client/game/constants/gameConstants.js >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE
cat src/client/game/config.js >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE
cat src/client/game/assets.js >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE
cat src/client/game/maps/map.js >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE
cat src/client/game/maps/mapLoader.js >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE
cat src/client/game/entities/bullet.js >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE
cat src/client/game/entities/tank.js >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE
cat src/client/game/ui/hud.js >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE
cat src/client/game/scenes/scene.js >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE
cat src/client/game/scenes/menuScene.js >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE
cat src/client/game/scenes/gameScene.js >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE
cat src/client/game/core/gameManager.js >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE
cat src/client/game/main.js >> $OUTPUT_FILE

echo "Client JavaScript built successfully!"

# Build UI files
cat src/client/ui/home.js > public/js/dist/home.js
cat src/client/ui/login.js > public/js/dist/login.js
cat src/client/ui/register.js > public/js/dist/register.js
cat src/client/ui/profile.js > public/js/dist/profile.js
cat src/client/ui/introduction.js > public/js/dist/introduction.js

echo "UI JavaScript files copied successfully!"

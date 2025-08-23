const socketIO = require('socket.io');
const GameService = require('../services/gameService');
const SHARED_CONSTANTS = require('../../shared/constants');

// Global game service instance
const gameService = new GameService();

function initSocket(server) {
    const io = socketIO(server);

    io.on('connection', (socket) => {
        console.log(`Player connected: ${socket.id}`);

        // Chat functionality
        socket.on("public chat", (msg) => {
            io.emit("public chat", msg);
        });

        socket.on("private chat", (msg) => {
            io.emit("private chat", msg);
        });

        socket.on("room chat", (roomID, msg) => {
            io.emit("room chat", msg);
        });

        socket.on("world chat", (msg) => {
            io.emit("world chat", msg);
        });

        // Game functionality
        socket.on(SHARED_CONSTANTS.SOCKET_EVENTS.JOIN_GAME, (data) => {
            try {
                const { gameId, playerData } = data;
                
                // Create game if it doesn't exist
                if (!gameService.games.has(gameId)) {
                    gameService.createGame(gameId);
                }

                const player = gameService.addPlayerToGame(gameId, socket.id, playerData);
                
                // Join socket room for this game
                socket.join(gameId);
                
                // Notify all players in the game
                const gameState = gameService.getGameState(gameId);
                io.to(gameId).emit(SHARED_CONSTANTS.SOCKET_EVENTS.GAME_STATE_UPDATE, gameState);
                
                // Send success response to joining player
                socket.emit(SHARED_CONSTANTS.SOCKET_EVENTS.JOIN_GAME, {
                    success: true,
                    player,
                    gameState
                });
                
                console.log(`Player ${playerData.username} joined game ${gameId}`);
            } catch (error) {
                socket.emit(SHARED_CONSTANTS.SOCKET_EVENTS.JOIN_GAME, {
                    success: false,
                    error: error.message
                });
            }
        });

        socket.on(SHARED_CONSTANTS.SOCKET_EVENTS.PLAYER_MOVE, (data) => {
            const { x, y, direction } = data;
            const player = gameService.updatePlayerPosition(socket.id, x, y, direction);
            
            if (player) {
                const playerInfo = gameService.players.get(socket.id);
                if (playerInfo) {
                    // Broadcast movement to other players in the same game
                    socket.to(playerInfo.gameId).emit(SHARED_CONSTANTS.SOCKET_EVENTS.PLAYER_MOVE, {
                        playerId: socket.id,
                        x, y, direction
                    });
                }
            }
        });

        socket.on(SHARED_CONSTANTS.SOCKET_EVENTS.PLAYER_SHOOT, (data) => {
            const playerInfo = gameService.players.get(socket.id);
            if (playerInfo) {
                // Broadcast shot to other players in the same game
                socket.to(playerInfo.gameId).emit(SHARED_CONSTANTS.SOCKET_EVENTS.PLAYER_SHOOT, {
                    playerId: socket.id,
                    ...data
                });
            }
        });

        socket.on('disconnect', () => {
            const playerInfo = gameService.removePlayerFromGame(socket.id);
            if (playerInfo) {
                // Notify other players about the disconnect
                const gameState = gameService.getGameState(playerInfo.gameId);
                if (gameState) {
                    io.to(playerInfo.gameId).emit(SHARED_CONSTANTS.SOCKET_EVENTS.GAME_STATE_UPDATE, gameState);
                }
                console.log(`Player ${socket.id} left game ${playerInfo.gameId}`);
            }
            console.log(`Player disconnected: ${socket.id}`);
        });
    });

    return io;
}

module.exports = initSocket;

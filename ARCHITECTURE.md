# Tank Battle - Refactored Project Structure

This document describes the refactored, professional architecture of the Tank Battle game project.

## Project Structure

```
Tank_Battle/
├── public/                 # Static assets only (served directly to client)
│   ├── css/               # Stylesheets
│   ├── html/              # HTML templates
│   ├── images/            # Static images
│   ├── assets/            # Game assets (audio, data, images)
│   ├── index.html         # Root index page
│   └── js/
│       └── dist/          # Built client JavaScript files
├── src/
│   ├── client/            # Frontend logic (runs in browser)
│   │   ├── engine/        # Game engine components
│   │   ├── game/          # Game logic and entities
│   │   ├── ui/            # UI-specific JavaScript
│   │   └── main.js        # Client entry point
│   ├── server/            # Backend logic (runs on Node.js)
│   │   ├── controllers/   # Request handlers
│   │   ├── routes/        # Express routes
│   │   ├── models/        # Data models
│   │   ├── services/      # Business logic services
│   │   ├── config/        # Configuration files
│   │   └── socket/        # Socket.IO handlers
│   ├── shared/            # Shared constants and utilities
│   └── app.js             # Main application setup
├── build-client.sh        # Client build script
├── server.js              # Application entry point
├── package.json           # Node.js dependencies and scripts
└── README.md              # This file
```

## Architecture Overview

### Frontend (Client-side)

- **Engine**: Core game engine components (physics, rendering, input handling)
- **Game**: Game-specific logic (entities, scenes, game manager)
- **UI**: User interface components for different pages

### Backend (Server-side)

- **Controllers**: Handle HTTP requests and responses
- **Services**: Business logic layer (game management, authentication)
- **Routes**: Express.js route definitions
- **Models**: Data access layer
- **Socket**: Real-time communication via Socket.IO

### Shared

- **Constants**: Shared between client and server (socket events, game rules)

## Key Features

### Clean Separation of Concerns

- **Client code** is in `src/client/` and gets built to `public/js/dist/`
- **Server code** is organized in `src/server/` with proper MVC structure
- **Static assets** remain in `public/` for direct serving

### Build System

- Client JavaScript files are concatenated and built using `build-client.sh`
- HTML files reference the built bundles instead of individual source files
- Build process can be extended for minification, bundling, etc.

### Professional Backend Structure

- **Controllers**: Handle request/response logic
- **Services**: Contain business logic
- **Routes**: Define API endpoints
- **Models**: Data layer abstraction

### Real-time Game Features

- Socket.IO integration for multiplayer functionality
- Game state management
- Player movement and shooting synchronization
- Chat system

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

```bash
# Install dependencies
npm install

# Build client-side files
npm run build:client

# Start the server
npm start
```

### Development

```bash
# Build and start in development mode
npm run dev
```

## API Endpoints

### Authentication

- `POST /login/api/login` - User login
- `POST /register/api/register` - User registration
- `GET /profile/api/:userId` - Get user profile
- `PUT /profile/api/:userId` - Update user profile

### Game Management

- `GET /game/api/games` - Get active games
- `POST /game/api/games` - Create new game
- `GET /game/api/games/:gameId` - Get game state

### Chat

- `GET /chat/api/history` - Get chat history
- `GET /chat/api/room/:roomId/history` - Get room chat history
- `GET /chat/api/stats` - Get chat statistics

## Socket Events

### Client → Server

- `join_game` - Join a game session
- `player_move` - Send player movement
- `player_shoot` - Send shooting action

### Server → Client

- `game_state_update` - Broadcast game state
- `player_move` - Broadcast player movement
- `player_shoot` - Broadcast shooting action

## Build Scripts

### `npm run build:client`

Concatenates all client-side JavaScript files in the correct order:

1. Engine files (utils, renderer, input, physics, assets)
2. Game files (constants, config, entities, scenes, core)
3. UI files (copied individually)

### `npm run dev`

Builds client files and starts the server in development mode.

## File Organization

### What Goes Where

#### `public/` - Static Assets Only

- HTML templates
- CSS stylesheets
- Images, audio, and other media
- Built JavaScript files (in `js/dist/`)

#### `src/client/` - Frontend Logic

- Game engine code
- Game entities and scenes
- UI interaction code
- Code that runs in the browser

#### `src/server/` - Backend Logic

- API request handlers
- Business logic services
- Database models
- Server configuration
- Socket.IO handlers

#### `src/shared/` - Common Code

- Constants used by both client and server
- Utility functions
- Shared data structures

## Configuration

### Environment Variables

Create a `.env` file with:

```env
MYSQL_HOST=localhost
MYSQL_USER=your_username
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=tank_battle
```

### Server Configuration

Edit `src/server/config/app.config.js` for server settings.

## Future Enhancements

1. **Advanced Build System**: Webpack or Rollup for better bundling
2. **TypeScript**: Add type safety
3. **Testing**: Unit and integration tests
4. **Database Integration**: Complete MySQL/Redis integration
5. **Authentication**: JWT-based authentication system
6. **CI/CD**: Automated testing and deployment

## Contributing

When adding new features:

1. Follow the established directory structure
2. Use appropriate controllers and services
3. Update the build script if adding new client files
4. Document API changes

## License

MIT License - see LICENSE file for details.

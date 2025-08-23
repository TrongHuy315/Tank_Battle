const express = require('express');
const app = express();
const path = require('path');

const initRoutes = require('./server/routes');
const initSocket = require('./server/socket');
// const { connectMySQL } = require('./server/models');
// const redisClient = require('./server/models/redis');

async function startApp(server) {
    // await connectMySQL();

    // connect redis and throw console.error

    app.use(express.json());
    app.use(express.urlencoded({ extended: true}));

    // Serve static files from public directory
    app.use(express.static(path.join(__dirname, '../public')));

    initSocket(server);
    initRoutes(app);
    
    // 404 handler for unknown routes
    app.use((req, res) => {
        res.status(404).sendFile(path.join(__dirname, '../public/html/home.html'));
    });

    // Global error handler
    app.use((err, req, res, next) => {
        console.error('Server error:', err);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
        });
    });
}

module.exports = { app, startApp };

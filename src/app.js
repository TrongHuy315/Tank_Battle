const express = require('express');
const app = express();
const path = require('path');
const initRoutes = require('./routes');
// const initSocket = require('./socket');
// const { connectMySQL } = require('./models');
// const redisClient = require('./redis');

async function startApp() {
    // await connectMySQL();

    // connect redis and throw console.error

    app.use(express.json());
    app.use(express.urlencoded({ extended: true}));

    app.use(express.static(path.join(__dirname, '../public')));

    initRoutes(app);
    // initSocket(server);
}

module.exports = { app, startApp };

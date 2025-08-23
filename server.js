require('dotenv').config();   // load thư viện dotenv lên để các file cấu hình đọc giá trị từ .env

const { app, startApp } = require('./src/app.js');
const http = require('http');
const config = require('./src/server/config/app.config.js');

const server = http.createServer(app);
startApp(server);

server.listen(config.port, () => {
    console.log(`Server is running at http://localhost:${config.port}`);
});

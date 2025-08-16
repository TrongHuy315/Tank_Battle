const mysql = require('mysql2')

const dbConfig = require('../config/db.config.js')

const connection = mysql.createConnection({
    host: dbConfig.mysql.host,
    user: dbConfig.mysql.user,
    password: dbConfig.mysql.password,
    database: dbConfig.mysql.database,
    multipleStatements: true
});

connection.query(
    `CREATE DATABASE IF NOT EXISTS ${dbConfig.mysql.database}`, (err, result) => {
        if (err) throw err;
    }
);

connection.query(
    `CREATE USER IF NOT EXISTS 'tank_user'@'localhost' IDENTIFIED BY '123'`, (err, result) => {
        if (err) throw err;
    }
);

connection.query(
    `GRANT ALL PRIVILEGES ON ${dbConfig.mysql.database}.* TO 'tank_user'@'localhost'`, (err, result) => {
        if (err) throw err;
    }
);

connection.query(
    `FLUSH PRIVILEGES`, (err, result) => {
        if (err) throw err;
    }
);

module.exports = connection;

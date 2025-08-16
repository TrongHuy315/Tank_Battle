const dbConfig = require('../config/db.config.js');
const connection = require('./db.models.js');

function createUsers() {
    connection.query(
        `USE ${dbConfig.mysql.database};
        
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            email VARCHAR(200) NOT NULL,
            password VARCHAR(100) NOT NULL
        );`, (err, results) => {
            if (err) throw err;
        }
    )
}

const USER = {
    create: (username, email, password) => {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO users(username, email, password) VALUES (?, ?, ?)";
            connection.query(query, [username, email, password], (err, result) => {
                if (err) return reject(err);

                resolve(result);
            })
        })
    },
    check: (username, password) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE username = ? AND password = ?";
            connection.query(query, [username, password], (err, result) => {
                if (err) return reject(err);

                resolve(result);
            })
        })
    }
}

createUsers();

module.exports = USER;

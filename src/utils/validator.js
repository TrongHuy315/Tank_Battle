// utils/validator.js
const Player = require('../models/player');

// Kiểm tra username có bị trùng không (dùng khi đăng ký)
async function isUsernameTaken(username) {
    const existing = await Player.findOne({ where: { username } });
    return !!existing; // true nếu tồn tại
}

// Kiểm tra tài khoản đăng nhập có hợp lệ không
async function validateLogin(username, password) {
    const player = await Player.findOne({ where: { username } });
    if (!player) return { valid: false, reason: 'User not found' };

    // Nếu có dùng bcrypt thì cần so sánh hash
    if (player.password !== password) {
        return { valid: false, reason: 'Incorrect password' };
    }

    return { valid: true, player };
}

module.exports = {
  isUsernameTaken,
  validateLogin
};

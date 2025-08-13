const express = require('express');
const router = express.Router();

const path = require('path');

router.get('/', (req, res) => {
    // Tạm thời chuyển hướng đến trang home
    // res.redirect('/home');
    // Hoặc có thể gửi một thông báo tạm thời
    res.send('Chat feature is under development');
});

module.exports = router;
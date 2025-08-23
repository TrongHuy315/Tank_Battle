const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/chatController');

const chatController = new ChatController();

// Chat page route
router.get('/', (req, res) => {
    // Tạm thời chuyển hướng đến trang home
    // res.redirect('/home');
    // Hoặc có thể gửi một thông báo tạm thời
    res.send('Chat feature is under development');
});

// API routes for chat functionality
router.get('/api/history', chatController.getChatHistory.bind(chatController));
router.get('/api/room/:roomId/history', chatController.getRoomChatHistory.bind(chatController));
router.get('/api/stats', chatController.getChatStats.bind(chatController));

module.exports = router;
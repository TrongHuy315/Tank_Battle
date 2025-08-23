const express = require('express');
const router = express.Router();
const PageController = require('../controllers/pageController');
const AuthController = require('../controllers/authController');

const pageController = new PageController();
const authController = new AuthController();

// Serve login page
router.get('/', pageController.login.bind(pageController));

// API routes for authentication
router.post('/api/login', authController.login.bind(authController));
router.post('/api/logout', authController.logout.bind(authController));

module.exports = router;

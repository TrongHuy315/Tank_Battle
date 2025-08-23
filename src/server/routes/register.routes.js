const express = require('express');
const router = express.Router();
const PageController = require('../controllers/pageController');
const AuthController = require('../controllers/authController');

const pageController = new PageController();
const authController = new AuthController();

// Serve register page
router.get('/', pageController.register.bind(pageController));

// API routes for registration
router.post('/api/register', authController.register.bind(authController));

module.exports = router;

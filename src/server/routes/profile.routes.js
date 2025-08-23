const express = require('express');
const router = express.Router();
const PageController = require('../controllers/pageController');
const AuthController = require('../controllers/authController');

const pageController = new PageController();
const authController = new AuthController();

// Serve profile page
router.get('/', pageController.profile.bind(pageController));

// API routes for profile management
router.get('/api/:userId', authController.getProfile.bind(authController));
router.put('/api/:userId', authController.updateProfile.bind(authController));

module.exports = router;

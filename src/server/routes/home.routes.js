const express = require('express');
const router = express.Router();
const PageController = require('../controllers/pageController');

const pageController = new PageController();

router.get('/', pageController.home.bind(pageController));

module.exports = router;

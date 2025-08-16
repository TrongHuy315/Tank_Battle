const express = require('express');
const router = express.Router();

const path = require('path');

const userController = require('../controllers/login.js');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/html/login.html'));
});

router.post('/', userController.login);

module.exports = router;

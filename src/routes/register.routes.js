const express = require('express');
const router = express.Router();

const path = require('path');

const userController = require('../controllers/register.js');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/html/register.html'));
});

router.post('/', userController.register);

module.exports = router;

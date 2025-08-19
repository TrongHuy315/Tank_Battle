const express = require('express');
const router = express.Router();

const authenticateToken = require('../utils/auth.token.js');
const getProfileData = require('../models/profile.model.js');

router.get("/profile", authenticateToken, async (req, res) => {
    const userData = await getProfileData(req.user.username);

    res.json(userData);
});

module.exports = router;

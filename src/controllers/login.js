const jwt = require('jsonwebtoken');

const USER = require('../models/users.model.js');
const appConfig = require('../config/app.config.js');

exports.login = async (req, res) => {
    try {
        const {username, password} = req.body;

        if (!username || !password) return res.status(400).json({message: "Missing Data!"});

        await USER.check(username, password);

        const user = {username};

        const token = jwt.sign(user, appConfig.jwtSecret, { expiresIn: "1h" });
        return res.status(200).json({token: token, username: username});
    } catch (err) {
        return res.status(500).json({message: "Error Server!"});
    }
}

const USER = require('../models/users.model.js');

exports.login = async (req, res) => {
    try {
        const {username, password} = req.body;

        if (!username || !password) return res.status(400).json({message: "Missing Data!"});

        await USER.check(username, password);

        res.status(201).json({message: "Login Successfully!"});
    } catch (err) {
        return res.status(500).json({message: "Error Server!"});
    }
}

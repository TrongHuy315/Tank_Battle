const USER = require('../models/users.model.js');

exports.register = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        if (!username || !email || !password) return res.status(400).json({message: "Missing Data!"});

        await USER.create(username, email, password);

        res.status(201).json({message: "Register Successfully!"});
    } catch (err) {
        res.status(500).json({message: "Error Server!"});
    }
}

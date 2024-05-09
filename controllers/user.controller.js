const userService = require('../services/user.service');
const jwt = require('jsonwebtoken');



const getUser = async (req, res) => {   
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.id ) {
            throw new Error('Unauthorized');
        }
        const user = await userService.getUser(decoded.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getUser,
}
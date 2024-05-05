const userService = require('../services/auth.service');

const register = async (req, res) => {
    try {
        const { name, username, email, password, phone, gender, birthDate } = req.body;
        await userService.register(name, username, email, password, phone, gender, birthDate);
        res.status(201).send("Success!");
    }
    catch (error) {
        if (error.message.includes('This')) {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
}
const login = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const token = await userService.login(email, username, password);
        res.status(200).json({ token });
    }
    catch (error) {
        if (error.message.includes('User not found')) {
            return res.status(400).json({ error: error.message });
        }
        if (error.message.includes('Invalid password')) {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    register,   
    login,
};
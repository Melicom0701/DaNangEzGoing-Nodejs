const userService = require('../services/auth.service');

const register = async (req, res) => {
    try {
        const { name, username, email, password, phone, gender, birthDate } = req.body;
        await userService.register(name, username, email, password, phone, gender, birthDate);
        res.status(201).send("Success!");
    }
    catch (error) {
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
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    register,   
    login,
};
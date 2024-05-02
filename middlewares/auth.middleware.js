

const validateLogin = (req, res, next) => {
    const { email, username, password } = req.body;
    if (!email && !username) {
        return res.status(400).json({ message: 'Email or username is required' });
    }
    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }
    next();
}
const validateRegister = (req, res, next) => {
    const { name, username, email, password ,gender,phone, birthDate} = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }
    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }
    if (name.length < 3) {
        return res.status(400).json({ message: 'Name must be at least 3 characters' });
    }
    if (username.length < 6) {
        return res.status(400).json({ message: 'Username must be at least 3 characters' });
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    const phoneRegex = /^\d+$/;
    if (phone && !phoneRegex.test(phone)) {
        return res.status(400).json({ message: 'Phone must be numbers' });
    }
    if (phone && phone.length < 10) {
        return res.status(400).json({ message: 'Phone must be at least 10 characters' });
    }
    const today = new Date();
    const birth = new Date(birthDate);

    if (today.getFullYear() - birth.getFullYear() < 16) {
        return res.status(400).json({ message: 'You must be at least 13 years old' });
    }



    next();




}
module.exports
    = {
    validateLogin,
    validateRegister,
}
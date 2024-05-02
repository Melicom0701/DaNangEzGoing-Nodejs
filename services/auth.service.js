const db = require('../models');
const User = db.User;
const {hashPassword,comparePassword,} = require('../helpers/hash');
const jwt = require('jsonwebtoken');
const { mailService } = require('./mail.service');
const { sendEmail } = mailService;
const { JWT_SECRET } = process.env;
const { Op } = require('sequelize');


const register = async (name, username, email, password, phone, gender, birthDate) => {

    try {
        const { hashedPassword, salt } = hashPassword(password);
        const newUser = await User.create({
            name,
            username,
            salt,
            email,
            hashedPassword,
            phone,
            gender,
            birthDate,
        });
        
    }
    catch (error) {


        //tell the user what is the field wrong
        error.errors.forEach((err) => {
            if (err.type === 'unique violation') {
                throw new Error(`This ${err.path} is already taken`);
            }
            else {
                throw new Error(`Error registering user: ${error.message}`);
            }
        }
        );


    }
}
const login = async (email,username, password) => {
    try{
        //can login by email or username
        const user = await User.findOne({
            where: {
                [Op.or]: [{ email: email || "" }, { username:username||"" }]
            }
        });
        if (!user) {
            throw new Error('User not found');
        }
        const isValidPassword = comparePassword(user.hashedPassword, user.salt, password); // Remove the extra comma here
        if (!isValidPassword) {
            throw new Error('Invalid password');
        }
        const token = jwt.sign({ id: user.id }, JWT_SECRET);
        return token;
    }
    catch (error) {
        error.errors.forEach((err) => {
            if (err.type === 'unique violation') {
                throw new Error(`This ${err.path} is already taken`);
            }
            else {
                throw new Error(`Error : ${error.message}`);
            }
        }
        );


    }
}


module.exports = {
    register,
    login,
};
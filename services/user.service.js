const { Sequelize } = require('sequelize');
const { User } = require('../models');


const getUser = async (id) => {
    try {
        const user = await User.findOne({
            where: {
                id
            },
            attributes: ['id', 'name', 'username', 'email', 'avatar', 'phone']
        });
        return user;
    } catch (error) {
        throw new Error(`Error getting user: ${error.message}`);
    }
}
module.exports = 
{
    getUser,
}
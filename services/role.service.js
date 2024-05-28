const {Sequelize} = require('sequelize');
const {Role} = require('../models');


const getAllRoles = async () => {
    try {
        const roles = await Role.findAll({
            attributes: ['id', 'name'],
        });
        return roles;
    } catch (error) {
        throw new Error(`Error getting roles: ${error.message}`);
    }
}
const getRoleById = async (id) => {
    try {
        const role = await Role.findOne({
            where: {
                id
            },
            attributes: ['id', 'name']
        });
        return role;
    } catch (error) {
        throw new Error(`Error getting role: ${error.message}`);
    }
}
module.exports = {
    getAllRoles,
    getRoleById
    
}
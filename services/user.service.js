const { Sequelize } = require('sequelize');
const { User } = require('../models');


const getUser = async (id) => {
    try {
        const user = await User.findOne({
            where: {
                id
            },
            attributes: ['id', 'name', 'username', 'email', 'roleId', 'avatar', 'phone']
        });
        return user;
    } catch (error) {
        throw new Error(`Error getting user: ${error.message}`);
    }
}
const updateUser = async (id,roleId) => {
    try {
        roleId = parseInt(roleId);
        const userX = await User.findOne({
            where: {
                id
            }
        });
        if (!userX) {
            throw new Error(`User not found`);
        }
        userX.roleId = roleId;
        await userX.save();

        return userX;
    } catch (error) {
        throw new Error(`Error updating user: ${error.message}`);
    }

}

const getAllUsers = async (_start, _end,q) => {
    try {
        if (!_start || !_end) {
            _start = 0;
            _end = 10;
        }
        if (!q) 
        q = '';
        _start = parseInt(_start);
        _end = parseInt(_end);
        const users = await User.findAndCountAll({
            attributes: ['id', 'name', 'username', 'email', 'avatar', 'phone','roleId','createdAt'],
            where: {
                [Sequelize.Op.or]: [
                    {
                        id: {
                            [Sequelize.Op.like]: `%${q}%`
                        }
                    },
                    {
                        name: {
                            [Sequelize.Op.like]: `%${q}%`
                        }
                    },
                    {
                        username: {
                            [Sequelize.Op.like]: `%${q}%`
                        }
                    },
                    {
                        email: {
                            [Sequelize.Op.like]: `%${q}%`
                        }
                    },
                    {
                        phone: {
                            [Sequelize.Op.like]: `%${q}%`
                        }
                    }
                ]
            },
            limit: _end - _start,
            offset: _start
        });

        return users;
    } catch (error) {
        throw new Error(`Error getting users: ${error.message}`);
    }
}
const deleteUser = async (id) => {
    try {
        const user = await User.destroy({
            where: {
                id
            }
        });
        return user;
    } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
}
module.exports = 
{
    getUser,getAllUsers,deleteUser,updateUser
}
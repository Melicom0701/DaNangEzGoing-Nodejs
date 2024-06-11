const userService = require('../services/user.service');
const jwt = require('jsonwebtoken');


const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const {roleId } = req.body;

        if (roleId !== "1" && roleId !== "2") {
            throw new Error('Invalid roleId');
        }

        const user = await userService.updateUser(id,roleId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}
const getUser = async (req, res) => {   
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(token)
        if (!decoded.id ) {
            throw new Error('Unauthorized');
        }
        const user = await userService.getUser(decoded.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getAllUsers = async (req, res) => {
    try {
        const { _start, _end ,q} = req.query;
        const results = await userService.getAllUsers(_start, _end,q);
        length = results.count;
        users = results.rows;
        //X-Total-Count

        res.set('Access-Control-Expose-Headers', 'X-Total-Count')
        res.set('X-Total-Count', length)
        
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getUserById = async (req, res) => {
    try {
        const user = await userService.getUser(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const deleteUser = async (req, res) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const updateProfile = async (req, res) => {
    try {
        const { id,name, username, avatar, email, phone,password } = req.body;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new Error('Invalid email');
        }
        if (!/^\d{10}$/.test(phone)) {
            throw new Error('Invalid phone');
        }


        const user = await userService.updateProfile(id, name, email, phone,avatar,password);
        res.status(200).json({message:"Update success"});
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    
    }
}
module.exports = {
    getUser,getAllUsers,getUserById,deleteUser,updateUser,updateProfile
}
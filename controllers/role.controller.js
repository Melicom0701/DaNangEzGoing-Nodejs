const roleService = require("../services/role.service.js"); 


const getAllRoles = async (req, res) => {   
    try {
        const roles = await roleService.getAllRoles();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}
const getRoleById = async (req, res) => {
    try {
        const role = await roleService.getRoleById(req.params.id);
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = {
    getAllRoles,
    getRoleById
}
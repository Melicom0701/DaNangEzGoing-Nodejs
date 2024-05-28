const express = require("express");
const router = express.Router();
const userController = require("../controllers/role.controller.js");


router.get("/", userController.getAllRoles);
router.get("/:id", userController.getRoleById);



module.exports = router;
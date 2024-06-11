const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/me", userController.getUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/me", userController.updateProfile);
// router.post("/", createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);


module.exports = router;
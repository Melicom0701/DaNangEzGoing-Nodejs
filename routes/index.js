const express = require("express");
const destinationRouter = require("./destination.router");
const authRouter = require("./auth.router");
const router = express.Router();
const userRouter = require("./user.router");
const blobRouter = require("./blob.router");
const searchRouter = require("./search.router");
const roleRouter = require("./role.router");

router.use("/destination", destinationRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/blob", blobRouter);
router.use("/roles", roleRouter);
router.use("/search", searchRouter);
module.exports = router;
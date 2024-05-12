const express = require("express");
const destinationRouter = require("./destination.router");
const authRouter = require("./auth.router");
const router = express.Router();
const userRouter = require("./user.router");
const blobRouter = require("./blob.router");


router.use("/destination", destinationRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/blob", blobRouter);
module.exports = router;
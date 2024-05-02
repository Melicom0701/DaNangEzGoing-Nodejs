const express = require("express");
const destinationRouter = require("./destination.router");
const authRouter = require("./auth.router");
const router = express.Router();



router.use("/destination", destinationRouter);
router.use("/auth", authRouter);
module.exports = router;
const express = require("express");
const router = express.Router();
const statsController = require("../controllers/stats.controller.js");

router.get("/numUsers", statsController.getNumUsers);
router.get("/numDestinations", statsController.getNumDestinations);
router.get("/numReviews", statsController.getNumReviews);
router.get("/monthlyUsers", statsController.getMonthlyUsers);
router.get("/monthlyDestinations", statsController.getMonthlyDestinations);
router.get("/monthlyReviews", statsController.getMonthlyReviews);

module.exports = router;

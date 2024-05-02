const express = require("express");
const router = express.Router();
const {
    addDestination,
    getDestination,
    updateDestination,
    deleteDestination,
    getDestinationById,
    getFoodItems,
    getTravelItems,
    getbookingItems} = require("../controllers/destination.controller");
const { validateInput } = require("../middlewares/destination.middleware");

router.post("/", validateInput, addDestination);
router.get("/food", getFoodItems);
router.get("/travel", getTravelItems);
router.get("/booking", getbookingItems);
router.get("/:id", getDestinationById);
router.get("/", getDestination);
router.put("/:id", updateDestination);
router.delete("/:id", deleteDestination);

module.exports = router;
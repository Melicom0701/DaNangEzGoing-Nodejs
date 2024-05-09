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
    addReview,
    getReviews,
    LikeStatus,
    LikeReview,
    getLikes,
    saveDestination,
    getbookingItems} = require("../controllers/destination.controller");
const { validateInput, validateReview } = require("../middlewares/destination.middleware");

router.post("/", validateInput, addDestination);
router.get("/food", getFoodItems);
router.get("/travel", getTravelItems);
router.get("/booking", getbookingItems);

//review routes
router.get("/:id/review",getReviews);
router.post("/:id/review", validateReview ,addReview);
router.get("/Review/:reviewId/LikeStatus", LikeStatus)
router.get("/Review/:reviewId/like", getLikes)
router.post("/Review/:reviewId/like", LikeReview)

//destination 
//save destination
router.post("/:id/save", saveDestination)

router.get("/:id", getDestinationById);
router.get("/", getDestination);
router.put("/:id", updateDestination);
router.delete("/:id", deleteDestination);


//desination review 


module.exports = router;
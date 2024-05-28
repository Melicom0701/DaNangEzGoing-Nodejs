const express = require("express");
const router = express.Router();
const  destinationController = require("../controllers/destination.controller");
const { validateInput, validateReview } = require("../middlewares/destination.middleware");
router.post("/", validateInput, destinationController.addDestination);
router.get("/food", destinationController.getFoodItems);
router.get("/travel", destinationController.getTravelItems);
router.get("/booking", destinationController.getbookingItems);

//review routes
router.get("/:id/review",destinationController.getReviews);
router.post("/:id/review", validateReview ,destinationController.addReview);
router.get("/Review/:reviewId/LikeStatus", destinationController.LikeStatus)
router.get("/Review/:reviewId/like", destinationController.getLikes)
router.post("/Review/:reviewId/like", destinationController.LikeReview)


//destination 
//save destination
router.post("/:id/save", destinationController.saveDestination);
router.get("/saved", destinationController.getSavedDestinations);

//destination routes
router.get("/:id", destinationController.getDestinationById);
router.get("/", destinationController.getAllDestination);
router.put("/:id", destinationController.updateDestination);
router.delete("/:id", destinationController.deleteDestination);


router.get("/:id/menu",destinationController.getMenu);
router.post("/:id/menu",destinationController.addMenu);

//category
router.get("/category", destinationController.getCategories);
router.post("/category", destinationController.addCategory);


//desination review 


module.exports = router;
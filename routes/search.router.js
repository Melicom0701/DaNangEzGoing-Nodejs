
const express = require("express");
const router = express.Router();
const  searchController  = require("../controllers/search.controller.js");

router.get("/searchByName", searchController.searchByName);
router.get("/searchByCategory", searchController.searchByCategory );
router.get("/getAllItems", searchController.getAllItems);
router.get("/filterSearch", searchController.filterSearch);

module.exports = router;


const express = require("express");
const router = express.Router();
const  searchController  = require("../controllers/search.controller.js");

router.get("/searchByName", searchController.searchByName);
router.get("/searchByCategory", searchController.searchByCategory );


module.exports = router;

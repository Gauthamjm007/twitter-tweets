const express = require("express");
const router = express.Router();
const searchController = require("../app/controllers/searchController");

//http://localhost:5000//api/twitter/search
router.post("/search", searchController.search);

module.exports = router;

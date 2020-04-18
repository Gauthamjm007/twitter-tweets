const express = require("express");
const router = express.Router();
const searchController = require("../app/controllers/searchController");

router.post("/search", searchController.search);

module.exports = router;

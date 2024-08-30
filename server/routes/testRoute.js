const express = require("express");

const { fetchNFTData } = require("../controllers/testController");

const router = express.Router();

router.route("/").get(fetchNFTData);

module.exports = router;

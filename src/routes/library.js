const express = require("express");
const router = express.Router();

const PrismicInitApi = require("../utils/prismic-init");

/* GET library page. */
router.get("/library", async (req, res, next) => {
	res.render("library", {});
});

module.exports = router;

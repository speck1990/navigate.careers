const express = require("express");
const router = express.Router();

const PrismicInitApi = require("../utils/prismic-init");

/* GET library page. */
router.get("/library", async (req, res, next) => {
	res.render("library", { i: "Dummy variable" });
});

module.exports = router;

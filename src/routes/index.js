const express = require("express");
const router = express.Router();

const PrismicInitApi = require("../utils/prismic-init");

/* GET home page. */
router.get("/", async (req, res, next) => {
	try {
		const api = await PrismicInitApi(req);
		const response = await api.getSingle("home");
		res.render("index", { layout: "layouts/home", document: response });
	} catch {
		res.status(404).render("404", { layout: "layouts/simple" });
	}
});

module.exports = router;

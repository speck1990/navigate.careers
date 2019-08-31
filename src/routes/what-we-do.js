const express = require("express");
const router = express.Router();

const Prismic = require("prismic-javascript");
const PrismicInitApi = require("../utils/prismic-init");

router.get("/what-we-do", async (req, res) => {
	try {
		const api = await PrismicInitApi(req);
		const response = await api.query(Prismic.Predicates.at("document.type", "what_we_do"));
		res.render("single", { document: response.results[0] });
	} catch {
		res.status(404).send("page not found");
	}
});

module.exports = router;

const express = require("express");
const router = express.Router();

const Prismic = require("prismic-javascript");
const PrismicInitApi = require("../utils/prismic-init");

router.get("/why-we-exist", async (req, res) => {
	try {
		const api = await PrismicInitApi(req);
		const response = await api.query(Prismic.Predicates.at("document.type", "why_we_exist"));

		console.log(response.results);
		res.render("single", { document: response.results[0] });
	} catch {
		res.status(404).send("page not found");
	}
});

module.exports = router;

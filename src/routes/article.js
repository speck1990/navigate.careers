const express = require("express");
const router = express.Router();

const Prismic = require("prismic-javascript");
const PrismicInitApi = require("../utils/prismic-init");

router.get("/article/:id", async (req, res) => {
	const id = req.params.id;

	try {
		const api = await PrismicInitApi(req);
		const response = await api.getByID(id);
		res.render("article", { document: response, layout: "layouts/simple" });
	} catch {
		res.status(404).send("page not found");
	}
});

module.exports = router;

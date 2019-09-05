const express = require("express");
const router = express.Router();

const Prismic = require("prismic-javascript");
const PrismicInitApi = require("../utils/prismic-init");

router.get("/:uid", async (req, res) => {
	const uid = req.params.uid;

	try {
		const api = await PrismicInitApi(req);
		const response = await api.getByUID("page", uid);
		res.render("page", { document: response, info: "Lorem ipsum" });
	} catch {
		res.status(404).send("page not found");
	}
});

module.exports = router;

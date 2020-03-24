const express = require("express");
const router = express.Router();
const pagination = require("pagination");

const Prismic = require("prismic-javascript");
const PrismicInitApi = require("../utils/prismic-init");

const auth = require("../middleware/auth");

/* GET library page. */
router.get("/faq", async (req, res) => {
	const uid = req.params.uid;

	try {
		const api = await PrismicInitApi(req);
		const response = await api.getSingle("faq");
		console.log(response.data.faq);
		res.render("faq", { document: response });
	} catch {
		res.status(404).send("page not found");
	}
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Prismic = require("prismic-javascript");
const prismicInitApi = require("../utils/prismic-init");

/* GET home page. */
router.get("/", (req, res, next) => {
	// prismicInitApi(req).then(api => {
	// 	api.query(Prismic.Predicates.at("document.type", "home")).then(response => {
	// 		console.log(response.results[0]);
	// 		res.render("index", { document: response.results[0] });
	// 	});
	// });

	res.render("index", { title: "Compass" });
});

module.exports = router;

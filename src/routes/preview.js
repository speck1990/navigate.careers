const express = require("express");
const router = express.Router();

const Prismic = require("prismic-javascript");
const { linkResolver, apiEndpoint } = require("../config/prismic-configuration");

// Example preview endpoint for NodeJS with ExpressJS
router.get("/preview", function(req, res) {
	const token = req.query.token;

	Prismic.getApi(apiEndpoint, { req: req })
		.then(api => api.previewSession(token, linkResolver, "/"))
		.then(url => {
			res.redirect(302, url);
		});
});

module.exports = router;

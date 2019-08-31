const PrismicDOM = require("prismic-dom");
const PrismicConfig = require("../config/prismic-configuration");

module.exports = (req, res, next) => {
	res.locals.ctx = {
		endpoint: PrismicConfig.apiEndpoint,
		linkResolver: PrismicConfig.linkResolver
	};

	res.locals.PrismicDom = PrismicDOM;
	next();
};

const Prismic = require("prismic-javascript");
const PrismicConfig = require("../config/prismic-configuration");

// Initialize the prismic.io api
const initApi = req => {
	return Prismic.getApi(PrismicConfig.apiEndpoint, {
		req: req
	});
};

module.exports = initApi;

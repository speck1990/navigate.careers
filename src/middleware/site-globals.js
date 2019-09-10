const PrismicInitApi = require("../utils/prismic-init");

module.exports = async (req, res, next) => {
	try {
		const api = await PrismicInitApi(req);
		const response = await api.getSingle("site_layout");
		const data = response.data;

		res.locals.site = {
			title: data.site_title[0].text,
			logo: data.site_logo,
			navigation: data.navigation,
			footerLogo: data.footer_logo,
			year: new Date().getFullYear()
		};
	} catch {}

	next();
};

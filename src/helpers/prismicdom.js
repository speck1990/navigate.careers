const hbs = require("hbs");
const PrismicDOM = require("prismic-dom");
const PrismicConfig = require("../config/prismic-configuration");

hbs.registerHelper("PrismicText", data => {
	return PrismicDOM.RichText.asText(data, PrismicConfig.linkResolver);
});

hbs.registerHelper("PrismicHTML", data => {
	return PrismicDOM.RichText.asHtml(data, PrismicConfig.linkResolver);
});

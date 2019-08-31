const hbs = require("hbs");
const PrismicDOM = require("prismic-dom");
const PrismicConfig = require("../config/prismic-configuration");

hbs.registerHelper("PrismicText", data => {
	return PrismicDOM.RichText.asText(data, PrismicConfig.linkResolver);
});

hbs.registerHelper("PrismicHtml", data => {
	const Elements = PrismicDOM.RichText.Elements;

	const htmlSerializer = (type, element, content, children) => {
		switch (type) {
			// case Elements.heading1:
			// 	return ``;

			// case Elements.heading2:
			// 	return ``;

			// case Elements.heading3:
			// 	return ``;

			// case Elements.heading4:
			// 	return ``;

			// case Elements.heading5:
			// 	return ``;

			// case Elements.heading6:
			// 	return ``;

			// case Elements.paragraph:
			// 	return ``;

			// case Elements.preformatted:
			// 	return ``;

			// case Elements.strong:
			// 	return ``;

			// case Elements.em:
			// 	return ``;

			// case Elements.listItem:
			// 	return ``;

			// case Elements.oListItem:
			// 	return ``;

			// case Elements.list:
			// 	return ``;

			// case Elements.image:
			// 	return ``;

			// case Elements.embed:
			// 	return ``;

			// case Elements.hyperlink:
			// 	return ``;

			// case Elements.label:
			// 	return ``;

			// case Elements.span:
			// 	return ``;

			default:
				return null;
		}
	};

	return PrismicDOM.RichText.asHtml(data, PrismicConfig.linkResolver, htmlSerializer);
});

const express = require("express");
const router = express.Router();

const Prismic = require("prismic-javascript");
const PrismicInitApi = require("../utils/prismic-init");

/* GET library page. */
router.get("/library", async (req, res, next) => {
	try {
		const api = await PrismicInitApi(req);
		const response = await api.getSingle("library");

		const articles = await api.query(Prismic.Predicates.at("document.type", "article"), { orderings: "[document.first_publication_date desc]" });

		// Add category slugs to array
		let usedCategories = articles.results.map(data => data.data.category.slug);
		// Remove duplicates
		usedCategories = [...new Set(usedCategories)];

		const categoryType = await api.query(Prismic.Predicates.at("document.type", "category"));

		const categories = []; // will contain the categories that are transferred to page
		categoryType.results.forEach(category => {
			usedCategories.find(usedCategory => {
				if (usedCategory === category.slugs[0]) {
					categories.push({ id: category.id, slug: category.slugs[0], name: category.data.name[0].text });
				}
			});
		});

		// Add "new" property to article if published less than 15 days
		articles.results.forEach((article, index) => {
			const pubDate = new Date(article.first_publication_date);
			const now = new Date();
			const diff = (now - pubDate) / (1000 * 60 * 60 * 24);
			if (diff < 8) {
				articles.results[index].new = true;
			}
		});

		//console.log(articles.results);
		res.render("library", { document: response, categories, articles: articles.results, noContainer: true });
	} catch (error) {
		res.status(404).send(error);
	}
});

module.exports = router;

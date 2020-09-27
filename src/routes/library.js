const express = require("express");
const router = express.Router();
const pagination = require("pagination");

const Prismic = require("prismic-javascript");
const PrismicInitApi = require("../utils/prismic-init");

const auth = require("../middleware/auth");

/* GET library page. */
router.get("/library", auth, async (req, res) => {
	const cat = req.query.category;
	try {
		const api = await PrismicInitApi(req);
		const response = await api.getSingle("library");

		// Get all of articles
		let articles = await api.query(Prismic.Predicates.at("document.type", "article"));

		// Add category slugs to array
		let usedCategories = articles.results.map(data => data.data.category.slug);
		// Remove duplicates
		usedCategories = [...new Set(usedCategories)];

		const categoryType = await api.query(Prismic.Predicates.at("document.type", "category"));

		const categories = []; // will contain the categories that are transferred to page
		categoryType.results.forEach(category => {
			categories.push({ id: category.id, slug: category.slugs[0], name: category.data.name[0].text, image: category.data.category_image.url });
		});

		res.render("library-grid", { document: response, categories, noContainer: true });
	} catch (error) {
		res.status(404).send(error);
	}
});

router.get("/library/:category", async (req, res) => {
	const page = req.query.page;
	const cat = req.params.category;
	try {
		const api = await PrismicInitApi(req);
		const response = await api.getSingle("library");

		// Get all of articles
		let articles = await api.query(Prismic.Predicates.at("document.type", "article"));

		// Add category slugs to array
		let usedCategories = articles.results.map(data => data.data.category.slug);
		// Remove duplicates
		usedCategories = [...new Set(usedCategories)];

		const categoryType = await api.query(Prismic.Predicates.at("document.type", "category"));

		const categories = []; // will contain the categories that are transferred to page
		categoryType.results.forEach(category => {
			// usedCategories.find(usedCategory => {
			// 	if (usedCategory === category.slugs[0]) {
			categories.push({ id: category.id, slug: category.slugs[0], name: category.data.name[0].text, image: category.data.category_image.url });
			// 	}
			// });
		});

		const articleOptions = { orderings: "[document.first_publication_date desc]", pageSize: 10, page };
		if (!cat) {
			articles = await api.query(Prismic.Predicates.at("document.type", "article"), articleOptions);
		} else {
			articles = await api.query([Prismic.Predicates.at("document.type", "article"), Prismic.Predicates.at("my.article.category", cat)], articleOptions);
		}

		articles.results.forEach((article, index) => {
			// Add "new" property to article if published less than 15 days
			const pubDate = new Date(article.first_publication_date);
			const now = new Date();
			const diff = (now - pubDate) / (1000 * 60 * 60 * 24);
			if (diff < 8) {
				articles.results[index].new = true;
			}

			// Check if featured_image.thumbnail is empty
			if (!article.data.featured_image.thumbnail.url) {
				// Search through body for embed or image type
				let thumbnailUrl;
				article.data.body.find(element => {
					if (element.type == "embed") {
						// Assign embed thumbnail url to thumbnailUrl
						return (thumbnailUrl = element.oembed.thumbnail_url);
					} else if (element.type == "image") {
						// Assign image url to thumbnailUrl
						return (thumbnailUrl = element.url);
					}
				});
				// Set featured_image.thumbnail.url to image found in article body
				article.data.featured_image.thumbnail.url = thumbnailUrl;
			}
		});

		let prelink = "/library";
		if (cat) {
			prelink += `?category=${cat}`;
		}
		let paginator = new pagination.TemplatePaginator({
			prelink,
			current: articles.page,
			rowsPerPage: articles.results_per_page,
			totalResult: articles.total_results_size,
			template: function (result) {
				let i, len, prelink;
				let html = `<ul class="paginationz top-margin-70">`;
				if (result.pageCount < 2) {
					html += "</ul>";
					return html;
				}
				prelink = this.preparePreLink(result.prelink);
				if (result.previous) {
					html += `<li class="prev"><a href="${prelink}${result.previous}"><i class="fa fa fa-caret-left"></i></a></li>`;
				}
				if (result.range.length) {
					for (i = 0, len = result.range.length; i < len; i++) {
						if (result.range[i] === result.current) {
							html += `<li><a class="active" href="${prelink}${result.range[i]}" title="">${result.range[i]}</a></li>`;
						} else {
							html += `<li><a class="" href="${prelink}${result.range[i]}" title="">${result.range[i]}</a></li>`;
						}
					}
				}
				if (result.next) {
					html += `<li class="prev"><a href="${prelink}${result.next}"><i class="fa fa fa-caret-right"></i></a></li>`;
				}
				html += "</ul>";
				return html;
			}
		});

		res.render("library", { document: response, categories, articles: articles, paginator: paginator.render(), noContainer: true });
	} catch (error) {
		res.status(404).send(error);
	}
});

module.exports = router;

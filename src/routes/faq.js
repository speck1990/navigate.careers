const express = require("express");
const router = express.Router();
const pagination = require("pagination");

const Prismic = require("prismic-javascript");
const PrismicInitApi = require("../utils/prismic-init");

const auth = require("../middleware/auth");

const mailgun = require("mailgun-js")({ apiKey: process.env.MAILGUN_API, domain: "m.navigate.careers" });
/* GET library page. */
router.get("/faq", async (req, res) => {
	const uid = req.params.uid;

	const isLoggedIn = req.user ? true : false;

	try {
		const api = await PrismicInitApi(req);
		const response = await api.getSingle("faq");
		console.log(response.data.faq);
		res.render("faq", { document: response, isLoggedIn });
	} catch {
		res.status(404).send("page not found");
	}
});

router.get("/ask", auth, async (req, res) => {
	const fullName = req.user.firstname + " " + req.user.lastname;
	const email = req.user.email;
	res.render("ask", { layout: "layouts/simple", fullName, email });
});

router.post("/ask", auth, async (req, res) => {
	const result = { valid: true };

	const data = {
		from: `${req.body.name} <${req.body.email}>`,
		to: "Navigate <speck1990@gmail.com>",
		subject: "WEBSITE: Ask a Question",
		template: "question",
		"v:name": req.body.name,
		"v:email": req.body.email,
		"v:message": req.body.message
	};

	mailgun.messages().send(data, (error, body) => {
		if (error) {
			result = { valid: false, errors: [{ msg: "There was a problem. Try again later." }] };
			return res.send(result);
		}

		result.msg = "Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.";
		res.send(result);
	});

	res.send(result);
});

module.exports = router;

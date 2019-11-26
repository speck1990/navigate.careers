const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

const PrismicInitApi = require("../utils/prismic-init");

const auth = require("../middleware/auth");

router.get("/register", async (req, res) => {
	res.render("register", { layout: "layouts/simple" });
});

router.post("/register", async (req, res) => {
	const entries = Object.entries(req.body);
	const fields = Object.keys(req.body);

	let errors = [];
	entries.forEach(entry => {
		if (!entry[1]) {
			errors.push(entry[0]);
		}
	});

	if (errors.length > 0) {
		return res.send({ fields, errors });
	}

	User.register(new User({ email: req.body.email, firstname: req.body.firstname, lastname: req.body.lastname }), req.body.password, (err, user) => {
		if (err) {
			console.log(err);
			return res.send(err);
		}

		passport.authenticate("local")(req, res, () => {
			return res.send({ valid: true });
		});
	});
});

module.exports = router;

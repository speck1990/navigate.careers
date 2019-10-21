const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

const PrismicInitApi = require("../utils/prismic-init");

const auth = require("../middleware/auth");

router.get("/register", auth, async (req, res) => {
	res.render("register", { layout: "layouts/simple" });
});

router.post("/register", auth, async (req, res) => {
	User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
		if (err) {
			console.log(err);
			return res.render("register");
		}

		passport.authenticate("local")(req, res, () => {
			res.redirect("/");
		});
	});
});

module.exports = router;

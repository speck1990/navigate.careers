const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const passwordValidator = require("password-validator");
const validator = require("validator");

const PrismicInitApi = require("../utils/prismic-init");

const auth = require("../middleware/auth");

router.get("/register", async (req, res) => {
	res.render("register", { layout: "layouts/simple" });
});

router.post("/register", async (req, res) => {
	const entries = Object.entries(req.body);
	const fields = Object.keys(req.body);

	let requiredEmpty = [];
	entries.forEach(entry => {
		if (!entry[1]) {
			requiredEmpty.push(entry[0]);
		}
	});

	let invalid = [];
	if (!validator.isEmail(req.body.email)) {
		invalid.push({
			field: "email",
			message: "Email is invalid"
		});
	}

	const passwordSchema = new passwordValidator();

	passwordSchema
		.is()
		.min(8) // Minimum length 8
		.is()
		.max(100) // Maximum length 100
		.has()
		.uppercase() // Must have uppercase letters
		.has()
		.lowercase() // Must have lowercase letters
		.has()
		.digits() // Must have digits
		.has()
		.symbols(); // Should have spymbols

	if (!passwordSchema.validate(req.body.password)) {
		invalid.push({
			field: "password",
			message: "Password must be a minimum 8 characters and contain at least uppercase, lowercase, number, and special character."
		});
	}

	if (req.body.password !== req.body.confirmpassword) {
		invalid.push({
			field: "confirmpassword",
			message: "Passwords didn't match."
		});
	}

	const result = {
		valid: false,
		fields,
		errors: {
			requiredEmpty,
			invalid
		}
	};

	return res.send(result);

	// User.register(new User({ email: req.body.email, firstname: req.body.firstname, lastname: req.body.lastname }), req.body.password, (err, user) => {
	// 	if (err) {
	// 		console.log(err);
	// 		return res.send(err);
	// 	}

	// 	passport.authenticate("local")(req, res, () => {
	// 		return res.send({ valid: true });
	// 	});
	// });
});

module.exports = router;

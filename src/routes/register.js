const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Organization = require("../models/organization");
const passport = require("passport");

const { userValidationRules, validationResult } = require("../middleware/validation");

router.post("/register", userValidationRules(), async (req, res) => {
	let result = { valid: true };

	const fields = Object.keys(req.body);

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		result = { valid: false, fields, errors: errors.array({ onlyFirstError: true }) };
		return res.send(result);
	}

	const organization = await Organization.findOne({ accessCode: req.body.organization });

	User.register(new User({ email: req.body.email, firstname: req.body.firstname, lastname: req.body.lastname, organization: organization._id }), req.body.password, (errors, user) => {
		if (errors) {
			result = { valid: false, fields, errors: [{ msg: "There was a problem. Try again later." }] };
			return res.send(result);
		}

		passport.authenticate("local")(req, res, () => {
			return res.send(result);
		});
	});
});

router.get("/organization", async (req, res) => {
	const organization = new Organization({
		name: "General",
		domain: "gmail.com",
		accessCode: "12345678"
	});

	try {
		await organization.save();
		res.status(201).send(organization);
	} catch (error) {
		res.status(404).send(error);
	}
});

module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Organization = require("../models/organization");
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

	let result = { valid: true };
	let organizationId;
	const organizationCode = req.body.organization;

	try {
		const organization = await Organization.findOne({ accessCode: organizationCode });
		if (!organization) {
			invalid.push({
				field: "organization",
				message: "Invalid organization code."
			});
		} else {
			const user = await User.findOne({ email: req.body.email });
			if (user) {
				invalid.push({
					field: "email",
					message: "Email is already registered."
				});
			} else {
				const domain = req.body.email.substring(req.body.email.indexOf("@") + 1);
				if (organization.domain !== domain) {
					invalid.push({
						field: "organization",
						message: "Organization code doesn't match email domain."
					});
				} else {
					organizationId = organization._id;
				}
			}
		}
	} catch (error) {
		result = { valid: false, error };
	}

	if (requiredEmpty.length > 0 || invalid.length > 0) {
		result = {
			valid: false,
			fields,
			errors: {
				requiredEmpty,
				invalid
			}
		};
	}

	if (result.valid) {
		User.register(new User({ email: req.body.email, firstname: req.body.firstname, lastname: req.body.lastname, organization: organizationId }), req.body.password, (err, user) => {
			if (err) {
				console.log(err);
				result = { valid: false, err };
			} else {
				passport.authenticate("local")(req, res, () => {
					return res.send(result);
				});
			}
		});
	} else {
		return res.send(result);
	}
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

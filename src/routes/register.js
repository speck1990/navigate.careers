const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Organization = require("../models/organization");
const passport = require("passport");
const mailer = require("../helpers/mailer");
const randomString = require("randomstring");

const { registerValidationRules, validationResult } = require("../middleware/validation");

const sendVerifyEmail = (req, res, { email, firstname, lastname, secretToken }) => {
	return new Promise((resolve, reject) => {
		mailer
			.sendMail({
				from: "postmaster@compass.careers", // sender address
				to: email,
				subject: `Hello ${firstname}! Welcome to Compass`,
				template: "verification",
				context: {
					firstname: firstname,
					lastname: lastname,
					secretToken,
					domain: process.env.DOMAIN,
					logo: res.locals.site.logo.url
				}
			})
			.then(data => {
				resolve(data);
			})
			.catch(error => {
				reject(error);
			});
	});
};

router.get("/register", (req, res) => {
	const userId = req.session.userId;

	if (userId) {
		return res.render("check-email", { layout: "layouts/simple", userId });
	}

	res.redirect("/");
});

router.post("/register/resend", async (req, res) => {
	const { uid } = req.body;
	const user = await User.findById(uid);

	try {
		await sendVerifyEmail(req, res, user);
	} catch (error) {
		console.log(error);
	}

	res.sendStatus(202);
});

router.post("/register", registerValidationRules(), async (req, res) => {
	let result = { valid: true };

	const fields = Object.keys(req.body);

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		result = { valid: false, fields, errors: errors.array({ onlyFirstError: true }) };
		return res.send(result);
	}

	const organization = await Organization.findOne({ accessCode: req.body.organization });
	const secretToken = randomString.generate();
	const active = false;

	User.register(new User({ email: req.body.email, firstname: req.body.firstname, lastname: req.body.lastname, organization: organization._id, secretToken, active }), req.body.password, async (errors, user) => {
		if (errors) {
			result = { valid: false, fields, errors: [{ msg: "There was a problem. Try again later." }] };
			return res.send(result);
		}

		try {
			await sendVerifyEmail(req, res, user);
		} catch (error) {
			console.log(error);
		}

		req.session.userId = user._id;
		return res.send(result);
	});
});

router.get("/verify/:secretToken", async (req, res) => {
	const secretToken = req.params.secretToken;

	try {
		const user = await User.findOne({ secretToken });
		if (!user) {
			return res.redirect("/");
		}

		user.active = true;
		user.secretToken = "";
		user.save();

		res.render("verified-email", { layout: "layouts/simple" });
	} catch (error) {
		console.log(error);
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

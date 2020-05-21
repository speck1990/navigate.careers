const express = require("express");
const router = express.Router();
const User = require("../models/user");

const mailgun = require("mailgun-js")({ apiKey: process.env.MAILGUN_API, domain: "m.navigate.careers" });

const { emailValidationRules, passwordValidationRules, validationResult } = require("../middleware/validation");

// Display form to submit email for password reset
router.get("/password/reset", async (req, res, next) => {
	res.render("password-reset", { layout: "layouts/simple" });
});

// Form post submission to check if email exists
router.post("/password/recover", emailValidationRules(), async (req, res, next) => {
	let result = { valid: true };

	const fields = Object.keys(req.body);
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		result = { valid: false, fields, errors: errors.array({ onlyFirstError: true }) };
		return res.send(result);
	}

	try {
		const user = await User.findOne({ email: req.body.email });

		user.generatePasswordReset();

		await user.save();

		let link = "http://" + req.headers.host + "/password/reset/" + user.resetPasswordToken;

		const data = {
			from: "Navigate <postmaster@navigate.careers>",
			to: user.email,
			subject: "Reset Password",
			template: "password-reset",
			"v:link": link,
			"v:domain": process.env.DOMAIN,
			"v:logo": res.locals.site.logo.url
		};

		mailgun.messages().send(data, (error, body) => {
			if (error) {
				result = { valid: false, errors: [{ msg: "There was a problem. Try again later." }] };
				return res.send(result);
			}

			result.msg = "Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.";
			res.send(result);
		});
	} catch (error) {
		result = { valid: false, errors: [{ msg: "There was a problem. Try again later." }] };
		res.send(result);
	}
});

// Display form to enter new password
router.get("/password/reset/:token", async (req, res) => {
	const token = req.params.token;

	try {
		const user = await User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } });

		if (!user) {
			return res.render("invalid-token", { layout: "layouts/simple" });
		}

		res.render("reset", { token, layout: "layouts/simple" });
	} catch (error) {
		console.log(error);
	}
});

// Form post submission to change password
router.post("/password/reset/:token", passwordValidationRules(), async (req, res, next) => {
	let result = { valid: true };

	const fields = Object.keys(req.body);
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		result = { valid: false, fields, errors: errors.array({ onlyFirstError: true }) };
		return res.send(result);
	}

	try {
		const user = await User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } });

		if (!user) {
			result = { valid: false, fields, errors: [{ msg: "There was a problem. Try again later." }] };
			return res.status(401).send(result);
		}

		await user.setPassword(req.body.password);

		user.resetPasswordToken = undefined;
		user.resetPasswordExpires = undefined;

		await user.save();

		result.msg = "Your password has been changed.";
		res.status(200).send(result);
	} catch (error) {
		result = { valid: false, fields, errors: [{ msg: "There was a problem. Try again later." }] };
		res.status(500).send(result);
	}
});

module.exports = router;

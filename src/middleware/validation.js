const { check, oneOf, validationResult } = require("express-validator");
const passwordValidator = require("password-validator");
const User = require("../models/user");
const Organization = require("../models/organization");

const validExistingEmail = () => {
	// Email should be valid and exist
	return check("email")
		.isEmail()
		.withMessage("Email is invalid.")
		.custom(value => {
			return User.findOne({ email: value }).then(user => {
				if (!user) {
					return Promise.reject("Email address does not exist.");
				}
			});
		});
};

const validNewEmail = () => {
	// Email should be valid and not taken
	return check("email")
		.isEmail()
		.withMessage("Email is invalid.")
		.custom(value => {
			return User.findOne({ email: value }).then(user => {
				if (user) {
					return Promise.reject("E-mail already in use.");
				}
			});
		});
};

const validPassword = () => {
	// Password should meet valid requirements
	return check("password").custom(value => {
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

		if (!passwordSchema.validate(value)) {
			throw new Error("Password must be at least 8 characters and contain uppercase, lowercase, number, and special characters.");
		}

		return true;
	});
};

const matchingConfirmPassword = () => {
	// Confirm password must match password
	return check("confirmpassword").custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error("Password and confirmation do not match.");
		}

		return true;
	});
};

const validOrganization = () => {
	// Organization code should exists and matches email domain
	return check("organization").custom((value, { req }) => {
		return Organization.findOne({ accessCode: value }).then(organization => {
			if (!organization) {
				return Promise.reject("Organization code is invalid.");
			}

			const domain = req.body.email.substring(req.body.email.indexOf("@") + 1);
			if (organization.domain !== domain) {
				return Promise.reject("Organization code doesn't match email domain.");
			}
		});
	});
};

// EXPORTED VALIDATIONS

const registerValidationRules = () => {
	return [
		// All fields are required
		oneOf([[check("firstname").notEmpty(), check("lastname").notEmpty(), check("email").notEmpty(), check("password").notEmpty(), check("confirmpassword").notEmpty(), check("organization").notEmpty()]], "All fields are required."),
		// Email should be valid and not taken
		validNewEmail(),
		// Password should meet valid requirements
		validPassword(),
		// Confirm password must match password
		matchingConfirmPassword(),
		// Organization code should exists and matches email domain
		validOrganization()
	];
};

const emailValidationRules = () => {
	return [
		// Email is required
		oneOf([[check("email").notEmpty()]], "Email is required."),
		// Email should be valid and existing
		validExistingEmail()
	];
};

const passwordValidationRules = () => {
	return [
		// All fields are required
		oneOf([[check("password").notEmpty(), check("confirmpassword").notEmpty()]], "All fields are required."),
		// Password should meet valid requirements
		validPassword(),
		// Confirm password must match password
		matchingConfirmPassword()
	];
};

module.exports = {
	registerValidationRules,
	emailValidationRules,
	passwordValidationRules,
	validationResult
};

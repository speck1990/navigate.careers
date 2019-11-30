const mongoose = require("mongoose");
const validator = require("validator");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error("Email is invalid");
			}
		}
	},
	firstname: {
		type: String,
		trim: true
	},
	lastname: {
		type: String,
		trim: true
	},
	organization: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Organization"
	}
});

UserSchema.plugin(passportLocalMongoose, {
	usernameField: "email"
});

module.exports = mongoose.model("User", UserSchema);

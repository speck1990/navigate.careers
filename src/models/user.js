const mongoose = require("mongoose");
const validator = require("validator");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		lowercase: true
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
	},
	secretToken: {
		type: String
	},
	active: {
		type: Boolean
	}
});

UserSchema.plugin(passportLocalMongoose, {
	usernameField: "email",
	findByUsername: function(model, queryParameters) {
		queryParameters.active = true;
		return model.findOne(queryParameters);
	}
});

module.exports = mongoose.model("User", UserSchema);

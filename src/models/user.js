const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema(
	{
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
		resetPasswordToken: {
			type: String
		},
		resetPasswordExpires: {
			type: Date
		},
		active: {
			type: Boolean
		}
	},
	{ timestamps: true }
);

UserSchema.plugin(passportLocalMongoose, {
	usernameField: "email"
});

UserSchema.methods.generatePasswordReset = function () {
	this.resetPasswordToken = crypto.randomBytes(20).toString("hex");
	this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

module.exports = mongoose.model("User", UserSchema);

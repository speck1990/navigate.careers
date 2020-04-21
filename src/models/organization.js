const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},
		domain: {
			type: String,
			required: true,
			trim: true
		},
		accessCode: {
			type: String,
			unique: true,
			required: true,
			trim: true,
			minlength: 7
		}
	},
	{ timestamps: true }
);

OrganizationSchema.virtual("users", {
	ref: "User",
	localField: "_id",
	foreignField: "organization"
});

module.exports = mongoose.model("Organization", OrganizationSchema);

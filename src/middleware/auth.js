const auth = (req, res, next) => {
	if (req.isAuthenticated()) {
		if (!req.user.active) {
			return res.render("unverified-email", { layout: "layouts/simple", email: req.user.email, userId: req.user._id });
		}

		return next();
	}

	res.redirect("/");
};

module.exports = auth;

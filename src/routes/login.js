const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post("/login", async (req, res, next) => {
	passport.authenticate("local", (error, user, info) => {
		if (error) return next(error);

		if (!user) {
			return res.send("Email or password are incorrect");
		}

		req.logIn(user, error => {
			if (error) {
				return next(error);
			}
			return res.send({ valid: true });
		});
		res.send(info.message);
	})(req, res, next);
});

module.exports = router;

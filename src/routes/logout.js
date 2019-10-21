const express = require("express");
const router = express.Router();

router.get("/logout", async (req, res) => {
	req.logout();
	res.redirect("/");
});

module.exports = router;

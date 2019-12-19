const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

const options = {
	viewEngine: {
		extname: ".hbs",
		layoutsDir: "views/emails/layouts",
		partialsDir: "views/emails/partials",
		defaultLayout: "main"
	},
	viewPath: "views/emails",
	extName: ".hbs"
};

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: 465,
	secure: true, // true for 465, false for other ports
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS
	}
});

transporter.use("compile", hbs(options));

module.exports = transporter;

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const hbs = require("hbs");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const expressSession = require("express-session");
const bodyParser = require("body-parser");

const User = require("./models/user");

// prismic setup
const PrismicContext = require("./middleware/prismic-context");
require("./helpers/prismicdom");

const siteGlobals = require("./middleware/site-globals");

// import routers
const indexRouter = require("./routes/index");
const libraryRouter = require("./routes/library");
const articleRouter = require("./routes/article");
const previewRouter = require("./routes/preview");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const pageRouter = require("./routes/page");

// connect to database
require("./db/mongoose");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "hbs");
app.set("view options", { layout: "layouts/main" });
hbs.registerPartials(path.join(__dirname, "../views/partials"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	expressSession({
		secret: "compass careers will help you learn",
		resave: false,
		saveUninitialized: false
	})
);

// passport user auth setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware for prismic context
app.use(PrismicContext);

// middleware for site globals
app.use(siteGlobals);

// router setup
app.use(indexRouter);
app.use(libraryRouter);
app.use(articleRouter);
app.use(loginRouter);
app.use(logoutRouter);
app.use(previewRouter);
app.use(pageRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;

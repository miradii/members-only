var createError = require("http-errors");
var compression = require("compression");
var helmet = require("helmet");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var mongoose = require("mongoose");
var authRouter = require("./routes/authRoutes");
const storyRouter = require("./routes/storyRoutes");
const { checkUser, requireAuth } = require("./middleware/authMiddleware");
const { getAllStories } = require("./middleware/dataMiddleware");
var app = express();
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
// view engine setup
// eslint-disable-next-line no-undef
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, "public")));

// connect to  db
// eslint-disable-next-line no-undef
const uri = process.env.DB_URI;
mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log(err);
    });

app.use("*", checkUser);
app.use("/", getAllStories, indexRouter);
app.use("/", authRouter);
app.use("/story", requireAuth, storyRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;

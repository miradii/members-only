var createError = require("http-errors");
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
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// connect to  db
const uri =
    "mongodb+srv://murtuz:bayern456@cluster0.lpfso.mongodb.net/members-only?retryWrites=true&w=majority";
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
app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/", requireAuth, storyRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;

const User = require("../models/user");

exports.login_get = (req, res, next) => {
    res.render("login_form", { title: "Login" });
};

exports.login_post = (req, res, next) => {
    res.send("login form not yet implemented");
};

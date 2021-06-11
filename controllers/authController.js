const User = require("../models/User");

exports.login_get = (req, res, next) => {
    res.render("login_form", { title: "Login" });
};

exports.login_post = (req, res, next) => {
    res.send("login form not yet implemented");
};
exports.signUp_get = (req, res, next) => {
    res.render("signUp_form", { title: "Sign Up" });
};

exports.signUp_post = (req, res, next) => {
    res.send("sign up form not implemented");
};

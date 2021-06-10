const User = require("../models/user");
const { body, validationResults } = require("express-validator");
const async = require("async");

exports.signUp_get = (req, res, next) => {
    res.render("signUp_form", { title: "Sign Up" });
};

exports.signUp_post = [
    body("firstname")
        .trim()
        .isLength({ min: 1 })
        .withMessage("FirstName is required.")
        .escape(),
    body("lastname")
        .trim()
        .isLength({ min })
        .withMessage("Last Name is required.")
        .escape(),
];

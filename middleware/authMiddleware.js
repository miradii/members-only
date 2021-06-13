const e = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, "mrtuz secret", (err, decodedToken) => {
            if (err) {
                res.redirect("/login");
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.redirect("/login");
    }
};

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, "mrtuz secret", async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                const user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

module.exports = { checkUser, requireAuth };

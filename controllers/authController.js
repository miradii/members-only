const User = require("../models/User");

const jwt = require("jsonwebtoken");
const handleErrors = (error) => {
    console.log(error.message, error.code);
    let errors = {
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        confirm: "",
    };
    if (error.code === 11000) {
        errors["email"] = "that email is already registered.";
    }
    //passwrod confirmation
    if (error.message.includes("passwords do not match")) {
        errors["confirm"] = error.message;
    }
    //validation Errors
    else if (error.message.includes("user validation failed")) {
        Object.values(error.errors).forEach(({ properties }) => {
            console.log(properties);
            errors[properties["path"]] = properties["message"];
        });
    }
    return errors;
};

const handleLoginErrors = (error) => {
    let errors = {
        email: "",
        password: "",
    };
    console.log(error);
    if (error.message.includes("incorrect email")) {
        errors.email = "that email is not regitered";
    }
    if (error.message.includes("incorrect password")) {
        errors.password = "that password is incorrect";
    }
    return errors;
};
exports.login_get = (req, res, next) => {
    res.render("login_form", { title: "Login" });
};

exports.login_post = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).send({ user: user._id });
    } catch (error) {
        const errors = handleLoginErrors(error);
        res.status(400).send({ errors });
    }
};
exports.signUp_get = (req, res, next) => {
    res.render("signUp_form", { title: "Sign Up" });
};
const maxAge = 60 * 60 * 24 * 3;
const createToken = (id) => {
    return jwt.sign({ id }, "mrtuz secret", {
        expiresIn: maxAge,
    });
};
exports.signUp_post = async (req, res, next) => {
    const { email, password, firstname, lastname, passwordConfirmation } =
        req.body;
    try {
        if (password != passwordConfirmation)
            throw new Error("passwords do not match");
        const user = await User.create({
            firstname,
            lastname,
            email,
            password,
            joidDate: new Date().now,
        });
        const token = createToken(user._id);
        res.cookie("jwt", token, { maxAge: maxAge * 1000, httpOnly: true });
        res.status(201).send({ user: user._id });
    } catch (error) {
        const errors = handleErrors(error);
        console.log(errors);
        res.status(400).json({ errors });
    }
};

module.exports.logout_get = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
};

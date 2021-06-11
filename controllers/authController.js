const User = require("../models/User");

const handleErrors = (error) => {
    console.log(error.message, error.code);
    let errors = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        passwordConfrimation: "",
    };

    //passwrod confirmation
    if (error.message.includes("passwords do not match")) {
        errors["passwordConfrimation"] = error.message;
    }
    //validation Errors
    else if (error.message.includes("User validation failed")) {
        Object.values(error.errors).forEach(({ properties }) => {
            console.log(properties);
            errors[properties["path"]] = properties["message"];
        });
    }
    return errors;
};

exports.login_get = (req, res, next) => {
    res.render("login_form", { title: "Login" });
};

exports.login_post = (req, res, next) => {
    res.send("login form not yet implemented");
};
exports.signUp_get = (req, res, next) => {
    res.render("signUp_form", { title: "Sign Up" });
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
        res.status(200).send({ user });
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json(errors);
    }
};

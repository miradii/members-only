const mongoose = require("mongoose");
const { isEmail } = require("validator");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const userSchema = new Schema({
    firstname: {
        type: String,
        required: [true, "please enter your first name"],
        maxlength: [100, "firstName is too long"],
    },
    lastname: {
        type: String,
        required: [true, "please enter your last name"],
        maxlength: 100,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "please enter an email"],
        validate: [isEmail, "please enter a valid email"],
    },
    joinDate: { type: Date },
    password: {
        type: String,
        required: [true, "please enter a password"],
        minlength: [6, "minimum password length is 6 characters"],
    },
    status: { type: String, enum: ["user", "admin"], default: "user" },
});

//statics
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw new Error("incorrect password");
    }
    throw new Error("incorrect email");
};

//hooks
userSchema.post("validate", async (doc, next) => {
    const salt = await bcrypt.genSalt();
    doc.password = await bcrypt.hash(doc.password, salt);
    next();
});

//virtual properties
userSchema.virtual("fullname").get(function () {
    return `${this.firstname} ${this.lastname}`;
});

userSchema.virtual("url").get(() => `/user/${this._id}`);

module.exports = mongoose.model("user", userSchema);

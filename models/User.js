const mongoose = require("mongoose");
const { isEmail } = require("validator");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const UserSchema = new Schema({
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
UserSchema.post("validate", async (doc, next) => {
    const salt = await bcrypt.genSalt();
    doc.password = await bcrypt.hash(doc.password, salt);
    next();
});

UserSchema.virtual("fullname").get(() => `${this.firstname} ${this.lastname}`);

UserSchema.virtual("url").get(() => `/user/${this._id}`);

module.exports = mongoose.model("user", UserSchema);

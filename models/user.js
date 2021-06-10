const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: { type: String, required: true, maxlength: 100 },
    lastname: { type: String, required: true, maxlength: 100 },
    joinDate: { type: Date },
    status: { type: String, enum: ["user", "admin"], default: "user" },
});

UserSchema.virtual("fullname").get(() => `${this.firstname} ${this.lastname}`);

UserSchema.virtual("url").get(() => `/user/${this._id}`);

module.exports = mongoose.model("User", UserSchema);

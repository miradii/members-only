const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StorySchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "story should have and author"],
    },
    topic: {
        type: String,
        maxlength: [25, "topic cannot be more than 25 characters"],
    },
    message: {
        type: String,
        required: true,
        maxlength: [280, "story can not be more than 280 characters"],
    },
    postDate: { type: Date, required: true, default: new Date() },
});

StorySchema.virtual("url").get(function () {
    return `/story/${this._id}`;
});

module.exports = mongoose.model("Story", StorySchema);

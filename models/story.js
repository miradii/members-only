const mongoos = require("mongoose");

const Schema = mongoos.Schema;

const StorySchema = new Schema({
    postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true, maxlength: 280 },
    postDate: { type: Date, required: true, default: new Date() },
});

StorySchema.virtual("url").get(() => `/story/${this._id}`);

module.exports = mongoose.model("Story", StorySchema);

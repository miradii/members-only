const Story = require("../models/Story");

module.exports.getStory = (req, res) => {
    res.render("story_form", { title: "Create a Story" });
};

module.exports.postStory = async (req, res) => {
    const { topic, story: message } = req.body;
    try {
        const author = res.locals.user;
        const story = await Story.create({ topic, author, message: message });
        console.log(story);
        res.status(200).send({ story });
    } catch (error) {
        res.status(400).send({ errors: "there were some errors" });
    }
};

module.exports.deleteStory = async (req, res) => {
    const storyId = req.params.id;
    console.log("deleteStoryPost");
    console.log(storyId);
    try {
        const deletedStory = await Story.findByIdAndDelete(storyId);
        res.status(200).json(deletedStory);
    } catch (error) {
        console.log("here is the delete error" + error);
    }
};

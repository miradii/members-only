const Story = require("../models/Story");
async function getAllStories(req, res, next) {
	try {
		const stories = await Story.find().populate("author");
		if (stories) {
			if (res.locals.user) {

			//check if the user is signed in if they are we send back the all properties
				res.locals.stories =   stories;
				console.log(stories);
				next();
			} else {
				//if user is not signed in we don't send the story author value
				res.locals.stories = stories.map(
					({ topic, message, postDate }) => {
						return { topic, message, postDate };
					}
				);
				next();
			}
		} else {
			res.locals.stories = null;
			next();
		}
	} catch (error) {
		console.log(error);
	}
}

module.exports = { getAllStories };

const router = require("express").Router();
const storyController = require("../controllers/storyController");
router.get("/story", storyController.getStory);
router.post("/story", storyController.postStory);
module.exports = router;

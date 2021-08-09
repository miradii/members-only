const router = require("express").Router();
const storyController = require("../controllers/storyController");
router.get("/", storyController.getStory);
router.post("/", storyController.postStory);
router.delete("/:id", storyController.deleteStory);
module.exports = router;

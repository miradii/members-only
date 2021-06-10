const express = require("express");
const router = express.Router();

const signUp_controller = require("../controllers/signUpController");
/* GET Sign UP form*/
router.get("/", signUp_controller.signUp_get);

/* Post Sign Up Form */
router.post("/", signUp_controller.signUp_post);

module.exports = router;

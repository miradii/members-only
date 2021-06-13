const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.get("/login", authController.login_get);
router.post("/login", authController.login_post);
router.get("/signup", authController.signUp_get);
router.post("/signup", authController.signUp_post);
router.get("/logout", authController.logout_get);
module.exports = router;

const express = require("express");
const userController = require("../controller/userController")
const bodyParser = require("body-parser")
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/signup", userController.signupPost)

module.exports = router
const express = require("express");
const userController = require("../controller/userController")
const bodyParser = require("body-parser")
const router = express.Router();
const {verifyToken} = require("../middleware/jwtMiddlewares")

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/get/tasks",verifyToken, userController.getTasks)

router.post("/signup",userController.signupPost)
router.post("/login", userController.loginPost)
router.post("/add/task",verifyToken, userController.addTask)

router.put("/task/editStatus",verifyToken,userController.editTaskStatus)

module.exports = router
const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const checkAuth = require('../middleware/check-auth');

router.post("/signup", userController.signup); //signup route
router.post("/login", userController.login); //login route
router.delete("/:id", checkAuth, userController.deleteUser); //delete user

module.exports = router;

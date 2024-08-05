const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const checkAuth = require('../middleware/check-auth');
const checkAdmin = require("../middleware/check-admin");

router.post("/signup", userController.signup); //signup route
router.post("/login", userController.login); //login route
router.delete("/:id", checkAuth, checkAdmin, userController.deleteUser); //delete user

module.exports = router;

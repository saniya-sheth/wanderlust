const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const flash = require("connect-flash");
const passport= require("passport");
const userController = require("../controllers/user.js");

router.route("/signup")
    .get(userController.signUpForm)
    .post(userController.signUp)

router.route("/login")
    .get(userController.logInForm)
    .post(passport.authenticate("local",
    {failureRedirect: "/login",
    failureFlash: true}),userController.logIn)

router.get("/logout",userController.logOut);

module.exports = router;
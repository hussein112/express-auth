const { Router } = require('express');
const AuthController = require("../controllers/AuthController");
const rateLimit = require("express-rate-limit");

const router = Router();

const LoginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: "Too many login attempts! Try again in 15 minutes."
})

router.post("/login", LoginLimiter, AuthController.login_post);

router.post("/logout", AuthController.logout_post);


module.exports = router;
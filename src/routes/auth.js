const router = require("express").Router()

// Middleware
const validator = require("../middleware/validator")

// Lib
const { login, passwordRecovery, register } = require("../lib/validationSchema")

router.get("/verifyCode/:code", (req, res) => res.send("verifyCode"))
router.post("/login", validator(login), (req, res) => res.send("login"))
router.post("/passwordRecovery", validator(passwordRecovery), (req, res) => res.send("passwordRecovery"))
router.post("/register", validator(register), (req, res) => res.send("register"))
router.post("/resetPassword", (req, res) => res.send("resetPassword"))

module.exports = router
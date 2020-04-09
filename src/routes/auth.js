const router = require("express").Router()

// Controllers
const { auth } = require("../controllers")

// Middleware
const authorization = require("../middleware/authorization")
const validator = require("../middleware/validator")

// Lib
const { login, passwordRecovery, register, resetPassword } = require("../lib/validationSchema")

router.post("/login", validator(login), auth.login)
router.get("/logout", authorization, auth.logout)
router.post("/passwordRecovery", validator(passwordRecovery), auth.passwordRecovery)
router.post("/register", validator(register), auth.register)
router.post("/resetPassword", validator(resetPassword), auth.resetPassword)
router.get("/verifyCode/:code", auth.verifyCode)

module.exports = router
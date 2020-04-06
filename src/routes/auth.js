const router = require("express").Router()

// Controllers
const { auth } = require("../controllers")

// Middleware
const validator = require("../middleware/validator")

// Lib
const { login, passwordRecovery, register, resetPassword } = require("../lib/validationSchema")

router.get("/verifyCode/:code", auth.verifyCode)
router.post("/login", validator(login), auth.login)
router.post("/passwordRecovery", validator(passwordRecovery), auth.passwordRecovery)
router.post("/register", validator(register), auth.register)
router.post("/resetPassword", validator(resetPassword), auth.resetPassword)

module.exports = router
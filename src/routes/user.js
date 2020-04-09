const router = require("express").Router()

// Controllers
const { user } = require("../controllers")

// Middleware
const validator = require("../middleware/validator")

// Lib
const { changePassword } = require("../lib/validationSchema")

router.get("/", user.profile)
router.post("/changePassword", validator(changePassword), user.changePassword)

module.exports = router
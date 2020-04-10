const router = require("express").Router()

// Importing routes
const session = require("./session")

// Controllers
const { user } = require("../controllers")

// Middleware
const validator = require("../middleware/validator")

// Lib
const { changePassword } = require("../lib/validationSchema")

router.get("/", user.profile)
router.post("/changePassword", validator(changePassword), user.changePassword)
router.use("/sessions", session)
module.exports = router
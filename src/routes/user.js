const router = require("express").Router()

// Controllers
const { user } = require("../../controllers")

// Middleware
const validator = require("../middleware/validator")

router.get("/", user.profile)
router.post("/changePassword", user.changePassword)

module.exports = router
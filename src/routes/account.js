const router = require("express").Router()

// Controllers
const { account } = require("../controllers")

// Middleware
const validator = require("../middleware/validator")

// Lib
const { deactivation, reactivation } = require("../lib/validationSchema")

router.get("/activation/:code", account.activation)
router.post("/deactivation", validator(deactivation), account.deactivation)
router.post("/reactivation", validator(reactivation), account.reactivation)

module.exports = router
const router = require("express").Router()

// Controllers
const { account } = require("../controllers")

// Middleware
const authorization = require("../middleware/authorization")
const validator = require("../middleware/validator")

// Lib
const { deactivation, reactivation } = require("../lib/validationSchema")

router.get("/activation/:code", account.activation)
router.post("/deactivation", authorization, validator(deactivation), account.deactivation)
router.post("/reactivation", validator(reactivation), account.reactivation)

module.exports = router
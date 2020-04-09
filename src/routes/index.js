const router = require("express").Router()

// Middleware
const authorization = require("../middleware/authorization")

// Importing routes
const account = require("./account")
const auth = require("./auth")
const user = require("./user")

// Using routes
router.use("/account", account)
router.use("/auth", auth)
router.use("/user", authorization, user)

module.exports = router
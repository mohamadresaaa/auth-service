const router = require("express").Router()

// Importing routes
const account = require("./account")
const auth = require("./auth")

// Using routes
router.use("/account", account)
router.use("/auth", auth)

module.exports = router
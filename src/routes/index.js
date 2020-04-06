const router = require("express").Router()

// Importing routes
import account from "./account"
import auth from "./auth"

// Using routes
router.use("/account", account)
router.use("/auth", auth)

module.exports = router
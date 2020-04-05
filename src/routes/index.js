const router = require("express").Router()

// Importing routes
import auth from "./auth"

// Using routes
router.use("/auth", auth)

module.exports = router
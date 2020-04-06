const router = require("express").Router()

// Controllers
const { account } = require("../controllers")

router.get("/activation/:code", account.activation)
router.post("/deactivation", account.deactivation)
router.post("/reactivation", account.reactivation)

module.exports = router
const router = require("express").Router()

router.get("/activation/:code", (req, res) => res.send("activation"))
router.post("/deactivation", (req, res) => res.send("deactivation"))
router.post("/reactivation", (req, res) => res.send("reactivation"))

module.exports = router
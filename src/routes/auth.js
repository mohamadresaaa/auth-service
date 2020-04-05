const router = require("express").Router()

router.get("/verifyCode/:code", (req, res) => res.send("verifyCode"))
router.post("/login", (req, res) => res.send("login"))
router.post("/passwordRecovery", (req, res) => res.send("passwordRecovery"))
router.post("/register", (req, res) => res.send("register"))
router.post("/resetPassword", (req, res) => res.send("resetPassword"))

module.exports = router
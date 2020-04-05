const router = require("express").Router()

router.get("/", (req, res) => {
	res.send("auth service")
})

module.exports = router
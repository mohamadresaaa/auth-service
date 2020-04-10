const router = require("express").Router()

// Controllers
const { session } = require("../controllers")

router.get("/", session.list)
router.delete("/:id", session.remove)

module.exports = router
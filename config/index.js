import development from "./development"
import production from "./production"

module.exports = process.env.NODE_ENV === "production" ? production : development
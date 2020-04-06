const joi = require("@hapi/joi")

const register = joi.object().keys({
	email: joi.string().email({ minDomainSegments: 2 }).required(),
	password: joi.string().min(8).required(),
	username: joi.string().required().regex(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,}$/).message("invalid username")
})

module.exports = { register }
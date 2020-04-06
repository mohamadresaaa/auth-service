const joi = require("@hapi/joi")

const login = joi.object().keys({
	email: joi.string().required(),
	password: joi.string().required()
})

const passwordRecovery = joi.object().keys({
	email: joi.string().required()
})

const register = joi.object().keys({
	email: joi.string().email({ minDomainSegments: 2 }).required(),
	password: joi.string().min(8).required(),
	username: joi.string().required().regex(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,}$/).message("invalid username")
})

module.exports = { login, passwordRecovery, register  }
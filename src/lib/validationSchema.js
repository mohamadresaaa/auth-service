const joi = require("@hapi/joi")

const changePassword = joi.object().keys({
	currentPassword: joi.string().required(),
	newPassword: joi.string().min(8).required()
})

const deactivation = joi.object().keys({
	password: joi.string().required()
})

const login = joi.object().keys({
	email: joi.string().required(),
	password: joi.string().required()
})

const passwordRecovery = joi.object().keys({
	email: joi.string().required()
})

const reactivation = joi.object().keys({
	email: joi.string().required()
})

const register = joi.object().keys({
	email: joi.string().email({ minDomainSegments: 2 }).required(),
	password: joi.string().min(8).required(),
	username: joi.string().required().regex(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,}$/).message("invalid username")
})

const resetPassword = joi.object().keys({
	code: joi.string().required(),
	confirmPassword: joi.string().valid(joi.ref("password")).messages({ "any.only": "confirm password must match password" }),
	password: joi.string().min(8).required()
})

module.exports = { changePassword, deactivation, login, passwordRecovery, reactivation, register, resetPassword }
const baseController = require("./baseController")

module.exports = new class AccountController extends baseController {
	async activation(req, res, next) {
		try {
			await this[Symbol.for("actions")].account.activation(this, req.body, res)
		} catch (error) {
			next(error)
		}
	}
    
	async deactivation(req, res, next) {
		try {
			await this[Symbol.for("actions")].account.deactivation(this, req, res)
		} catch (error) {
			next(error)
		}
	}
    
	async reactivation(req, res, next) {
		try {
			await this[Symbol.for("actions")].account.reactivation(this, req.body, res)
		} catch (error) {
			next(error)
		}
	}
}
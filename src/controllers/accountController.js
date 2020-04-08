const baseController = require("./baseController")

module.exports = new class AccountController extends baseController {
	async activation(req, res, next) {
		try {
			await this[Symbol.for("services")].account.activation(this, req.body, res)
		} catch (error) {
			next(error)
		}
	}
    
	async deactivation(req, res, next) {
		try {
			await this[Symbol.for("services")].account.deactivation(this, req, res)
		} catch (error) {
			next(error)
		}
	}
    
	async reactivation(req, res, next) {
		try {
			await this[Symbol.for("services")].account.reactivation(this, req.body, res)
		} catch (error) {
			next(error)
		}
	}
}
const baseController = require("./baseController")

module.exports = new class AuthController extends baseController {
	async login(req, res, next) {
		try {
			await this[Symbol.for("services")].auth.login(this, req, res)
		} catch (error) {
			next(error)
		}
	}

	async logout (req, res, next) {
		try {
			await this[Symbol.for("services")].auth.logout(this, req.session, res)
		} catch (error) {
			next(error)
		}
	}
    
	async passwordRecovery(req, res, next) {
		try {
			await this[Symbol.for("services")].auth.passwordRecovery(this, req.body, res)
		} catch (error) {
			next(error)
		}
	}
    
	async register(req, res, next) {
		try {
			await this[Symbol.for("services")].auth.register(this, req.body, res)
		} catch (error) {
			next(error)
		}
	}
    
	async resetPassword(req, res, next) {
		try {
			await this[Symbol.for("services")].auth.resetPassword(this, req.body, res)
		} catch (error) {
			next(error)
		}
	}

	async verifyCode(req, res, next) {
		try {
			await this[Symbol.for("services")].auth.verifyCode(this, req.params.code, res)
		} catch (error) {
			next(error)
		}
	}
}
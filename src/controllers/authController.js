const baseController = require("./baseController")

module.exports = new class AuthController extends baseController {
	async login(req, res, next) {
		try {
			res.send("login")
		} catch (error) {
			next(error)
		}
	}
    
	async passwordRecovery(req, res, next) {
		try {
			res.send("passwordRecovery")
		} catch (error) {
			next(error)
		}
	}
    
	async register(req, res, next) {
		try {
			res.send("register")
		} catch (error) {
			next(error)
		}
	}
    
	async resetPassword(req, res, next) {
		try {
			res.send("resetPassword")
		} catch (error) {
			next(error)
		}
	}

	async verifyCode(req, res, next) {
		try {
			res.send("verifyCode")
		} catch (error) {
			next(error)
		}
	}
}
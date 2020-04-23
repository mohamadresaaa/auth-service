const baseController = require("./baseController")

module.exports = new class UserController extends baseController {
	async profile (req, res, next) {
		try {
			await this[Symbol.for("actions")].user.profile(this, req.session, res)
		} catch (error) {
			next(error)
		}
	}

	async changePassword (req, res, next) {
		try {
			await this[Symbol.for("actions")].user.changePassword(this, req, res)
		} catch (error) {
			next(error)
		}
	}
}
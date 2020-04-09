const baseController = require("./baseController")

module.exports = new class UserController extends baseController {
	async profile (req, res, next) {
		try {
			await this[Symbol.for("services")].user.profile(this, req.session, res)
		} catch (error) {
			next(error)
		}
	}

	async changePassword (req, res, next) {
		try {
			await this[Symbol.for("services")].user.changePassword(this, req, res)
		} catch (error) {
			next(error)
		}
	}
}
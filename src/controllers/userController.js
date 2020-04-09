const baseController = require("./baseController")

module.exports = new class UserController extends baseController {
	async profile (req, res, next) {
		try {

		} catch (error) {
			next(error)
		}
	}

	async changePassword (req, res, next) {
		try {

		} catch (error) {
			next(error)
		}
	}
}
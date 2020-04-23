const baseController = require("./baseController")

module.exports = new class SessionController extends baseController {
	async list (req, res, next) {
		try {
			await this[Symbol.for("actions")].session.list(this, req.session, res)
		} catch (error) {
			next(error)
		}
	}

	async remove (req, res, next) {
		try {
			await this[Symbol.for("actions")].session.remove(this, req.params.id, res)
		} catch (error) {
			next(error)
		}
	}
}
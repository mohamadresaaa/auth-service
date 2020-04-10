const baseController = require("./baseController")

module.exports = new class SessionController extends baseController {
	async list (req, res, next) {
		try {
			await this[Symbol.for("services")].session.list(this, req.session, res)
		} catch (error) {
			next(error)
		}
	}

	async remove (req, res, next) {
		try {
			await this[Symbol.for("services")].session.remove(this, req.params.id, res)
		} catch (error) {
			next(error)
		}
	}
}
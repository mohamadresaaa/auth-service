const baseController = require("./baseController")

module.exports = new class AccountController extends baseController {
	async activation(req, res, next) {
		try {
			res.send("activation")
		} catch (error) {
			next(error)
		}
	}
    
	async deactivation(req, res, next) {
		try {
			res.send("deactivation")
		} catch (error) {
			next(error)
		}
	}
    
	async reactivation(req, res, next) {
		try {
			res.send("reactivation")
		} catch (error) {
			next(error)
		}
	}
}
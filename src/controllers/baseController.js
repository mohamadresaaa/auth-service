const autoBind = require("auto-bind")
const services = require("../services")
const models = require("../models")

module.exports = class BaseController {
	constructor () {
		// Binding methods for using on child classes
		autoBind(this)

		// Set models
		this[Symbol.for("models")] = models

		// Set services
		this[Symbol.for("services")] = services
	}

	/** Show public info message
   * @param {response} express
   * @param {object} data
   * @return response
   */
	infoMessage (res, data) {
		res.status(data.status).json(data)
	}
}
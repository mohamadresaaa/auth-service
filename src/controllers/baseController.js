module.exports = class BaseController {
	constructor () {
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
/** Current user information
 * @param {object} controller
 * @param {object} user from req.user
 * @param {object} res from express
 * @returns {response} user information
 */
module.exports = async (controller, { user }, res) => {
	try {
		// Return user information
		return controller.infoMessage(res, 200, {
			...user.toAuthJson(null)
		})
	} catch (error) {
		throw error
	}
}
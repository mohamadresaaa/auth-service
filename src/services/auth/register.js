/** Sign up user
 * @param {object} controller
 * @param {object} data from req.body
 * @param {string} data.email
 * @param {string} data.username
 * @param {string} data.password
 * @param {object} res from express
 * @returns {response} message
 */
module.exports = async (controller, data, res) => {
	try {
		// User Model
		const { User } = controller[Symbol.for("models")]

		// Create new user
		const newUser = await new User({ ...data }).save()

		// Create a verification code for account activation

		// Send verification code to mail service

		// Return info message
		return controller.infoMessage(res, {
			message: "Please refer to your email for activation",
			status: 200
		})
	} catch (error) {
		throw error
	}
}
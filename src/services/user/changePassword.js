const { ErrorMessage } = require("../../lib/messages")

/** Update password of user
 * @param {object} controller
 * @param {object} user from req.user
 * @param {string} currentPassword from req.body
 * @param {string} newPassword from req.body
 * @param {object} res from express
 * @returns {response} message
 */
module.exports = async (controller, { body: { currentPassword, newPassword }, session: { id, user } }, res) => {
	try {
		// Session model
		const { Session } = controller[Symbol.for("models")]

		// Check if the password is correct => if not, handle it
		if (!await user.comparePassword(currentPassword))
			throw new ErrorMessage("Invalid Data", "Password is not valid", 422)

		// Set and update password
		await user.$set({ password: newPassword }).save()

		// Remove other sessions
		await Session.deleteMany({ id: { $ne: id } })

		// Return info message
		return controller.infoMessage(res, 200, {
			message: "Your password has been successfully changed"
		})
	} catch (error) {
		throw error
	}
}
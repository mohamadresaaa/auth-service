/** Submit password recovery link
 * @param {object} controller
 * @param {string} email from req.body
 * @param {object} res from express
 * @return {response} message
 */
module.exports = async (controller, { email }, res) => {
	try {
		// User, VerificationCode Model
		const { User, VerificationCode } = controller[Symbol.for("models")]

		// Find user with email or username
		const user = await User.findOne({ $or: [{ email }, { username: email }] })

		// If user exists
		if (user) {
			// Create a verification code for password recovery
			const newVerificationCode = await new VerificationCode({
				expiryDate: new Date(new Date().setMinutes(new Date().getMinutes() + 10)),
				for: "Password recovery",
				user: user.id
			}).save()

			// Send verification code to mail service
		}

		// Return info message
		return controller.infoMessage(res, 200, {
			message: "Password recovery link was sent to your email"
		})
	} catch (error) {
		throw error
	}
}
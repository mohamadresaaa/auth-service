const { ErrorMessage } = require("../../lib/messages")

/** User account reactivation
 * @param {object} controller
 * @param {string} username from req.body
 * @param {object} res from express
 * @returns {response} message
 */
module.exports = async (controller, { email }, res) => {
	try {
		// User, VerificationCode model
		const { User, VerificationCode } = controller[Symbol.for("models")]

		// Find user
		const user = await User.findOne({ $or: [{ email }, { username: email }] })

		// If user exists, handle it
		if (user) {
			// If user is blocked, return error
			if (user.status === "block")
				throw new ErrorMessage("Account status", "Your account has been blocked See support for reviewing your account", 403)

			// If user is inactive
			if (user.status === "inactive") {
				// Create a verification code for account activation
				const newVerificationCode = await new VerificationCode({
					expiryDate: new Date(new Date().setDate(new Date().getDate() + 1)),
					for: "Account activation",
					user: user.id
				}).save()

				// Send verification code to mail service
			}
		}

		// Return info message
		return controller.infoMessage(res, 200, {
			message: "Please refer to your email for activation"
		})
	} catch (error) {
		throw error
	}
}
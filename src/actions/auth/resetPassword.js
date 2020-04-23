const { ErrorMessage } = require("../../lib/messages")

/** Reset password if validation code is valid
 * @param {object} controller
 * @param {string} code from req.body
 * @param {string} password from req.body
 * @param {object} res from express
 * @return {response} message
 */
module.exports = async (controller, { code, password }, res) => {
	try {
		// VerificationCode, Session model
		const { VerificationCode, Session } = controller[Symbol.for("models")]

		// Find verification code
		const verifyCode = await VerificationCode.findOne({
			code,
			expiryDate: { $gt: new Date() },
			for: "Password recovery",
			used: false
		}).populate("user")

		// If find verification code, handle it
		if (verifyCode) {
			await verifyCode.user.set({ password }).save()

			// Remove sessions of user
			await Session.deleteMany({ user: verifyCode.user.id })

			// Expire verification code
			await verifyCode.updateOne({ used: true })

			// Return info message
			return controller.infoMessage(res, 200, {
				message: "Your password has been successfully retrieved"
			})
		}

		// Otherwise, return error message
		throw new ErrorMessage("Invalid verification code", "Verification code is incorrect", 400)
	} catch (error) {
		throw error
	}
}
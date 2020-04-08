const { ErrorMessage } = require("../../lib/messages")

/** User account activation
 * @param {object} controller
 * @param {string} code from req.body
 * @param {object} res from express
 * @returns {response} message and user
 */
module.exports = async (controller, code, res) => {
	try {
		// VerificationCode model
		const { VerificationCode } = controller[Symbol.for("models")]

		// Find verification code
		const verifyCode = await VerificationCode.findOne({
			code,
			expiryDate: { $gt: new Date() },
			for: "Account activation",
			used: false
		}).populate("user")

		// If find verification code, handle it
		if (verifyCode) {
			// Change status to active
			await verifyCode.user.set({ status: "active" }).save()

			// Expire verification code
			await verifyCode.updateOne({ used: true })

			// Return info message
			return controller.infoMessage(res, 200, {
				message: "Your account has been successfully activated"
			})
		}

		// Otherwise, return error
		throw new ErrorMessage("Invalid verification code", "Verification code is incorrect", 422)
	} catch (error) {
		throw error
	}
}
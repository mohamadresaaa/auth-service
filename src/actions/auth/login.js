const { ErrorMessage } = require("../../lib/messages")

/** Sign in user
 * @param {object} controller
 * @param {string} email from req.body
 * @param {string} password from req.body
 * @param {string} ipAddress from req.ipAddress
 * @param {string} device from req.device
 * @param {object} res from express
 * @returns {response} user and token
 */

module.exports = async (controller, { body: { email, password }, ipAddress, device }, res) => {
	try {
		// User, VerificationCode model
		const { User, VerificationCode } = controller[Symbol.for("models")]

		// Find user
		const user = await User.findOne({ $or: [{ email }, { username: email }] })

		// If find user, handle it
		if (user) {
			// If user status is inactive or block
			if (user.status === "inactive" || user.status === "block") {
				throw new ErrorMessage("Account status",
					user.status === "inactive"
						? "Your account is disabled Please activate your account"
						: "Your account has been blocked See support for reviewing your account",
					403)
			}

			// If password is the same
			if (await user.comparePassword(password)) {
				// If enabled two factor auth
				if(user.isTwoFactorAuth) {
					// Generate verification code
					const newVerificationCode = await new VerificationCode({
						code: (parseInt(Math.random() * 1000000000000000)).toString().substr(0, 6),
						expiryDate: new Date(new Date().setMinutes(new Date().getMinutes() + 2)),
						for: "Two factor auth",
						user: user.id
					}).save()
					
					// Send verification code to mail service
					
					// Return info message
					return controller.infoMessage(res, 301, {
						message: "The verification code has been sent to your email"
					})
				}

				// Otherwise, generate jwt token and save to session, return info message and user
				return controller.infoMessage(res, 200, {
					...user.toAuthJson(await user.generateSession(ipAddress, device))
				})
			}

			// Otherwise, handle it
			throw new ErrorMessage("Unauthorized user", "Incorrect email or password", 401)
		}

		// Otherwise, user is found return error message
		throw new ErrorMessage("Unauthorized user", "Incorrect email or password", 401)
	} catch (error) {
		throw error
	}
}
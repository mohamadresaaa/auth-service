const { ErrorMessage } = require("../lib/messages")
const { Session } = require("../models")
const { verify } = require("jsonwebtoken")

// Make sure the user is authenticated
module.exports = async (req, res, next) => {
	try {
		// Get jwt token from header [authorization]
		const token = req.headers.authorization

		// If exists token, handle it
		if (token) {
			// Verify token
			const payload = verify(token,
				config[Symbol.for("private key")] + config[Symbol.for("public key")],
				{ issuer: "jraw" })

			// Find session in mongodb with jwt token and user.id and populate user collection
			const session = await Session.findOne({
				expiryDate: { $gt: new Date() },
				token,
				user: payload.sub
			}).populate("user")

			// If exists, handle it
			if (session) {
				if (session.user.status !== "block" && session.user.status !== "inactive") {
					// Set user to req.user and return next
					// eslint-disable-next-line require-atomic-updates
					req.session = session
					return next()
				} else {
					throw new ErrorMessage("Account status",
						session.user.status === "inactive"
							? "Your account is disabled Please activate your account"
							: "Your account has been blocked See support for reviewing your account",
						403)
				}
			} else {
				throw new ErrorMessage("Unauthorized", "Your session has expired", 401)
			}
		} else {
			throw new ErrorMessage("Unauthorized", "Authentication failed", 401)
		}
	} catch (error) {
		const customError = new ErrorMessage(error.name, "Authentication failed", 401)
		next(customError)
	}
}
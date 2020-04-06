const { unlinkSync } = require("fs")
const { ErrorMessage, PublicErrorMessage } = require("../lib/messages")

// eslint-disable-next-line no-unused-vars
const apiErrorHandler = (error, req, res, next) => {
	if (req.file) unlinkSync(req.file.path)

	switch (process.env.NODE_ENV) {
	case "production":
		error.message = "Server encountered an error please wait a while"
		return res.status(error.status ? error.status : 500).json(new PublicErrorMessage(error))

	default:
		return res.status(error.status ? error.status : 500).json({
			message: error.message,
			stack: error.stack
		})
	}
}

const apiError404 = (req, res, next) => {
	try {
		throw new PublicErrorMessage(ErrorMessage.errNotFound())
	} catch (error) {
		next(error)
	}
}

module.exports = { apiError404, apiErrorHandler }
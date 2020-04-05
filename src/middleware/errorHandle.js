import { unlinkSync } from "fs"
import { ErrorMessage, PublicErrorMessage } from "../lib/messages"

// eslint-disable-next-line no-unused-vars
export const apiErrorHandler = (error, req, res, next) => {
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

export const apiError404 = (req, res, next) => {
	try {
		throw new PublicErrorMessage(ErrorMessage.errNotFound())
	} catch (error) {
		next(error)
	}
}
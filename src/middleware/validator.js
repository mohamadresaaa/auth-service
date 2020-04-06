const { unlinkSync } = require("fs")
const { ErrorMessage } = require("../lib/messages")

/** Validation data
 * @package joi
 * @param {object} schema
 * @return values & error
 */
module.exports = schema => (req, res, next) => {
	const { error, value } = schema.validate(req.body)

	if (error) {
		if (req.file) 
			unlinkSync(req.file.path)

		// eslint-disable-next-line no-useless-escape
		return res.status(422).json(new ErrorMessage("Invalid Data", error.details[0].message.replace(/(\")+/g, ""), 422))
	}

	if (!req.value)
		req.value = {}

	req.value.body = value
	next()
}
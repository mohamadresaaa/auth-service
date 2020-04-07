module.exports = (req, res, next) => {
	// Set ip address in req.ipAddress
	req.ipAddress = req.header("x-forwarded-for") || req.connection.remoteAddress
	next()
}
/* eslint-disable no-useless-escape */
module.exports = (req, res, next) => {
	const userAgent = req.headers["user-agent"]
	const device = {}

	if (/like Mac OS X/.test(userAgent)) {
		device.os = "iOS"
		device.version = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(userAgent)[2].replace(/_/g, ".")
	} else if (/Android/.test(userAgent)) {
		device.os = "Android"
		device.version = /Android ([0-9\.]+)[\);]/.exec(userAgent)[1]
	} else if (/(Intel|PPC) Mac OS X/.test(userAgent)) {
		device.os = "macOs"
		device.version = /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/.exec(userAgent)[2].replace(/_/g, ".")
	} else if (/Windows NT/.test(userAgent)) {
		device.os = "Windows"
		device.version = /Windows NT ([0-9\._]+)[\);]/.exec(userAgent)[1]
	} else {
		device.os = /PostmanRuntime\/([0-9\.]+)/.test(userAgent) ? "Postman" : "unknown"
		device.version = device.os === "unknown" ? undefined : userAgent.replace(/PostmanRuntime\//, "")
	}

	req.device = device
	next()
}
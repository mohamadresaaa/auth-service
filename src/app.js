const { apiError404, apiErrorHandler } = require("./middleware/errorHandle")
const { createServer } = require("http")
const { json, urlencoded } = require("body-parser")
const contentType = require("./middleware/contentType")
const cors = require("cors")
const device = require("./middleware/device")
const express = require("express")
const helmet = require("helmet")
const ipAddress = require("./middleware/ipAddress")
const mongoose = require("mongoose")
const morgan = require("morgan")
const routes = require("./routes")

/** @define Private properties and methods */
const configuration = Symbol("Server packages configuration")
const provider = Symbol("Application provider")
const setupExpress = Symbol("Express installation")
const setupMongodb = Symbol("Mongodb installation and configuration")
const setupRoutes = Symbol("Setup server routes")

module.exports = class App {
	constructor() {
		this[provider] = express()
	}

	/** Run all methods
	 * @public
	 */
	initialize() {
		this[setupExpress]()
		this[setupMongodb]()
		this[configuration]()
		this[setupRoutes]()
	}

	/** Setup server with express
	 * @private
	 * @package http, express
	 */
	[setupExpress]() {
		const server = createServer(this[provider])
		server.listen(config.port, () => console.log(`Server running on port ${config.port}`))
	}

	/** Setup mongodb and set config
	 * @private
	 * @package mongoose
	 */
	[setupMongodb]() {
		mongoose.Promise = global.Promise
		mongoose.connect(config[Symbol.for("database url")], {
			useCreateIndex: true,
			useFindAndModify: false,
			useNewUrlParser: true,
			useUnifiedTopology: true
		},
		err => {
			err ? console.log(err.message) : console.log("Database connected")
		})
	}

	/** Setup and using packages
	 * @private
	 * @package helmet, cors, body-parser, contentType, device, ipAddress, morgan
	 */
	[configuration]() {
		this[provider].use(helmet())
		this[provider].use(cors({
			credentials: true,
			methods: "GET, POST, PUT, DELETE",
			origin: "*"
		}))
		this[provider].use(json())
		this[provider].use(urlencoded({
			extended: true
		}))
		this[provider].use(contentType)
		this[provider].use(device)
		this[provider].use(ipAddress)

		if (process.env.NODE_ENV !== "production") {
			this[provider].use(morgan("dev"))
		}
	}

	/** Import routes and errors management
	 * @private
	 */
	[setupRoutes]() {
		this[provider].use(routes)
		this[provider].use("*", apiError404)
		this[provider].use(apiErrorHandler)
	}
}
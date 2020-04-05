import { apiError404, apiErrorHandler } from "./middleware/errorHandle"
import { createServer } from "http"
import { json, urlencoded } from "body-parser"
import contentType from "./middleware/contentType"
import cors from "cors"
import express from "express"
import helmet from "helmet"
import mongoose from "mongoose"
import morgan from "morgan"
import routes from "./routes"

export default class App {
	constructor() {
		this.app = express()
	}

	/** Run all methods
	 * @public
	 */
	initialize() {
		this.setupExpress()
		this.setupMongodb()
		this.configuration()
		this.setupRoutes()
	}

	/** Setup server with express
	 * @private
	 * @package http, express
	 */
	setupExpress() {
		const server = createServer(this.app)
		server.listen(config.port, () => console.log(`Server running on port ${config.port}`))
	}

	/** Setup mongodb and set config
	 * @private
	 * @package mongoose
	 */
	setupMongodb() {
		mongoose.Promise = global.Promise
		mongoose.connect("", {
			useNewUrlParser: true
		},
		err => {
			err ? console.log(err.message) : console.log("Database connected")
		})
	}

	/** Setup and using packages
	 * @private
	 * @package helmet, cors, body-parser, contentType, morgan
	 */
	configuration() {
		this.app.use(helmet())
		this.app.use(cors({
			credentials: true,
			methods: "GET, POST, PUT, DELETE",
			origin: "*"
		}))
		this.app.use(json())
		this.app.use(urlencoded({
			extended: true
		}))
		this.app.use(contentType)

		if (process.env.NODE_ENV !== "production") {
			this.app.use(morgan("dev"))
		}
	}

	/** Import routes and errors management
	 * @private
	 */
	setupRoutes() {
		this.app.use(routes)
		this.app.use("*", apiError404)
		this.app.use(apiErrorHandler)
	}
}
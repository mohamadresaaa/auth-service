import { apiError404, apiErrorHandler } from "./middleware/errorHandle"
import { createServer } from "http"
import { json, urlencoded } from "body-parser"
import contentType from "./middleware/contentType"
import cors from "cors"
import express from "express"
import helmet from "helmet"
import mongoose from "mongoose"
import morgan from "morgan"

export default class App {
	constructor() {
		this.app = express()
	}

	initialize() {
		this.setupExpress()
		this.setupMongodb()
		this.configuration()
		this.setupRoutes()
	}

	setupExpress() {
		const server = createServer(this.app)
		server.listen(config.port, () => console.log(`Server running on port ${config.port}`))
	}

	setupMongodb() {
		mongoose.Promise = global.Promise
		mongoose.connect("", {
			useNewUrlParser: true
		},
		err => {
			err ? console.log(err.message) : console.log("Database connected")
		})
	}

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

	setupRoutes() {
		this.app.use("*", apiError404)
		this.app.use(apiErrorHandler)
	}
}
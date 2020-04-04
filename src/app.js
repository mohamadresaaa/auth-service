import { createServer } from "http"
import { json, urlencoded } from "body-parser"
import cors from "cors"
import express from "express"
import helmet from "helmet"

export default class App {
    constructor() {
        this.app = express()
    }

    initialize() {
        this.setupExpress()
    }

    setupExpress() {
        const server = createServer(this.app)
        server.listen(config.port, () =>  console.log(`Server running on port ${config.port}`))
    }

    configuration() {
        this.app.use(helmet())
        this.app.use(cors({
			credentials: true,
			methods: "GET, POST, PUT, DELETE",
			origin: "*"
		}))
        this.app.use(json())
        this.app.use(urlencoded({ extended: true }))
    }
}
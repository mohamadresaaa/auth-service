import { createServer } from "http"
import { json, urlencoded } from "body-parser"
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
        server.listen(3000, () =>  console.log("Server running on port 3000"))
    }

    configuration() {
        this.app.use(helmet())
        this.app.use(json())
        this.app.use(urlencoded({ extended: true }))
    }
}
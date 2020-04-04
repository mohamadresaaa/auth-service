import { createServer } from "http"
import express from "express"


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
}
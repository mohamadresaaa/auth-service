import { createServer } from "http"
import { json, urlencoded } from "body-parser"
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

        if(process.env.NODE_ENV === "development") {
            this.app.use(morgan("dev"))
        }
    }
}
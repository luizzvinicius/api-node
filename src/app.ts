import express from "express"
import router from "./routes/router"

export default class App {
    server: express.Application

    constructor() {
        this.server = express()
        this.middleware()
        this.router()
    }
    
    private middleware() {
        this.server.use(express.json())
    }

    private router() {
        this.server.use(router)
    }
}
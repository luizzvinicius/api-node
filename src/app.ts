import "express-async-errors"
import express, { NextFunction } from "express"
import { Request, Response } from "express"
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
        this.server.use((error: Error, req: Request, res: Response, next: NextFunction) => {
            return res.status(500).json({ details: error.message })
        })
    }

    private router() {
        this.server.use(router)
    }
}
import express, { Express } from "express"
import { bindControllers } from "./controllers/index.controller"
import { swaggerDocs } from "./utils/swagger"
import cors from "cors"

export class ExpressServer {
    private app: Express | undefined

    initializeServer() {
        this.app = express()
        this.app.use(express.json())
        this.app.use(cors({
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
        }))
        this.app.get("/", (req, res) => res.send("<h1>Booker API</h1>"))
        this.app.listen(this.getPort(), () => console.log("Express Server initiated on port: " + this.getPort()))
        swaggerDocs(this.app)
        bindControllers(this.app)
    }

    private getPort = () => parseInt(process.env.PORT || "") || 3002
}
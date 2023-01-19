import { Express } from "express";
import { Redis } from "src/redis.client";

export class ToolsController {
    constructor(private app: Express) {
        this.init()
    }

    private init() {
        this.app.get("/tools/restartRedisClient", async (req, res) => {
            await Redis.initializeRedis()
            res.send("OK!")
        })
    }
}
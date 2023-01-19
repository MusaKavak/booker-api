import { RedisClientType } from "@redis/client";
import { createClient } from "redis";

export class Redis {
    static client: RedisClientType | undefined

    static async initializeRedis() {
        const redisUrl = process.env.REDIS_URL
        const redisUsername = process.env.REDIS_USERNAME
        const redisPassword = process.env.REDIS_PASSWORD
        if (redisUrl == undefined) {
            console.error("There is no Redis Server Url")
            return
        }
        await this.startServer(redisUrl, redisUsername, redisPassword)
    }

    static async startServer(url: string, username: string | undefined, password: string | undefined) {
        try {
            console.log("Connecting To Redis Server From: " + url)

            this.client = createClient({ url, username, password })

            this.client.on("error", (error) => {
                console.error(`Redis Error: ${error}`)
                this.client?.disconnect()
                this.client = undefined
            })

            this.client.on("connect", () => console.log(`Redis Client Connected`))

            await this.client?.connect()
        } catch (error) { console.error(error) }
    }

    static isAvaliable(): boolean {
        if (this.client == undefined) return false
        return this.client.isOpen
    }
}
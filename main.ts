import { ExpressServer } from "./src/express.server";
import * as dotenv from "dotenv"
import { Supabase } from "./src/supabase.client"
import { Redis } from "./src/redis.client"


async function main() {
    dotenv.config()

    const express = new ExpressServer()

    Supabase.initializeSupabase()

    await Redis.initializeRedis()

    express.initializeServer()
}

main()


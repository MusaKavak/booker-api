import { Redis } from "src/redis.client"

export async function cache<T>(key: string, callback: Function, ttl: number): Promise<T | null> {
    if (!Redis.isAvaliable()) return callback() as T
    else {
        const cache = await Redis.client!!.get(key)

        if (cache == null) {

            const data = await callback() as T

            if (data != null) await Redis.client!!.setEx(key, ttl, JSON.stringify(data))

            return data

        } else return JSON.parse(cache) as T
    }
}

export async function deleteCache(keys: string[]) {
    if (Redis.isAvaliable()) {
        for (const key of keys) {
            await Redis.client?.del(key)
        }
    }
}

export async function deleteCacheByPattern(pattern: string) {
    if (Redis.isAvaliable()) {
        const keys = await Redis.client!!.keys(pattern)
        await deleteCache(keys)
    }
}
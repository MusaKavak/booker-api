import { Rank, RankInsert, RankUpdate } from "src/models/rank";
import { Supabase } from "src/supabase.client";
import { autoInjectable } from "tsyringe";
import { IRankManager } from "../interfaces/i.rank.manager";
import { nullPlaceholder, returnCheck } from "./tools";

@autoInjectable()
export class RankSupabaseManagaer implements IRankManager {
    async getAll(): Promise<Rank[] | null> {
        const { data, error } = await this.from()?.select() || nullPlaceholder
        return returnCheck(data, error)
    }

    async getById(id: number): Promise<Rank | null> {
        const { data, error } = await this.from()?.select().eq("id", id).single() || nullPlaceholder
        return returnCheck(data, error)
    }

    async add(model: RankInsert): Promise<Rank | null> {
        model.created_at = new Date().toJSON()
        const { data, error } = await this.from()?.insert(model).select().single() || nullPlaceholder
        return returnCheck(data, error)
    }

    async update(model: RankUpdate): Promise<Rank | null> {
        model.updated_at = new Date().toJSON()
        const { data, error } = await this.from()?.update(model).select().single() || nullPlaceholder
        return returnCheck(data, error)
    }

    async deleteById(id: number): Promise<boolean> {
        const { error } = await this.from()?.delete().eq("id", id) || nullPlaceholder
        if (error != null) {
            console.error(error);
            return false
        }
        return true
    }

    private from() {
        return Supabase.client?.from("Rank")
    }
}
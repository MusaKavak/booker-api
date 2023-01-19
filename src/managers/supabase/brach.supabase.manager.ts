import { Branch, BranchInsert, BranchUpdate } from "src/models/branch";
import { Supabase } from "src/supabase.client";
import { autoInjectable } from "tsyringe";
import { IBranchManager } from "../interfaces/i.branch.manager";
import { nullPlaceholder, returnCheck } from "./tools";

@autoInjectable()
export class BrachSupabaseManager implements IBranchManager {

    async getAll(): Promise<Branch[] | null> {
        const { data, error } = await this.from()?.select() || nullPlaceholder
        return returnCheck(data, error)
    }

    async getById(id: number): Promise<Branch | null> {
        const { data, error } = await this.from()?.select().eq("id", id).single() || nullPlaceholder
        return returnCheck(data, error)
    }

    async add(model: BranchInsert): Promise<Branch | null> {
        model.created_at = new Date().toJSON()
        const { data, error } = await this.from()?.insert(model).select().single() || nullPlaceholder
        return returnCheck(data, error)
    }

    async update(model: BranchUpdate): Promise<Branch | null> {
        model.updated_at = new Date().toJSON()
        const { data, error } = await this.from()?.update(model).eq("id", model.id).select().single() || nullPlaceholder
        return returnCheck(data, error)
    }

    async deleteById(id: number): Promise<boolean> {
        const { error } = await this.from()?.delete().eq("id", id) || nullPlaceholder
        if (error != null) {
            console.error(error)
            return false
        }
        return true
    }

    private from() {
        return Supabase.client?.from("Branch")
    }
}
import { Employee } from "src/models/employee";
import { EmployeeRank, EmployeeRankInsert, EmployeeRankUpdate } from "src/models/employeeRank";
import { Rank } from "src/models/rank";
import { Supabase } from "src/supabase.client";
import { autoInjectable } from "tsyringe";
import { IEmployeeRankManager } from "../interfaces/i.employeeRank.manager";
import { nullPlaceholder, returnCheck } from "./tools";

@autoInjectable()
export class EmployeeRankSupabaseManager implements IEmployeeRankManager {

    async getEmployeesByRankId(rankId: number): Promise<any[] | null> {
        const { data, error } = await this.from()?.select("id,employee_id(*)").eq("rank_id", rankId) || nullPlaceholder
        return returnCheck(data, error)
    }

    async getRanksByEmployeeId(employeeId: number): Promise<any[] | null> {
        const { data, error } = await this.from()?.select("id,rank_id(*)").eq("employee_id", employeeId) || nullPlaceholder
        return returnCheck(data, error)
    }

    async getAll(): Promise<EmployeeRank[] | null> {
        const { data, error } = await this.from()?.select() || nullPlaceholder
        return returnCheck(data, error)
    }

    async getById(id: number): Promise<EmployeeRank | null> {
        const { data, error } = await this.from()?.select().eq("id", id).single() || nullPlaceholder
        return returnCheck(data, error)
    }

    async add(model: EmployeeRankInsert): Promise<EmployeeRank | null> {
        model.created_at = new Date().toJSON()
        const { data, error } = await this.from()?.insert(model).select().single() || nullPlaceholder
        return returnCheck(data, error)
    }

    async update(model: EmployeeRankUpdate): Promise<EmployeeRank | null> {
        model.updated_at = new Date().toJSON()
        const { data, error } = await this.from()?.update(model).select().single() || nullPlaceholder
        return returnCheck(data, error)
    }

    async deleteById(id: number): Promise<boolean> {
        const { data, error } = await this.from()?.delete().eq("id", id) || nullPlaceholder
        if (error != null) {
            console.error(error);
            return false
        }
        return true
    }

    private from() {
        return Supabase.client?.from("EmployeeRank")
    }
}
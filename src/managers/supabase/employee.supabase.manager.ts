import { autoInjectable } from "tsyringe";
import { Employee, EmployeeInsert, EmployeeUpdate } from "src/models/employee";
import { Supabase } from "src/supabase.client";
import { IEmployeeManager } from "src/managers/interfaces/i.employee.manager";
import { nullPlaceholder, returnCheck } from "./tools";

@autoInjectable()
export class EmployeeSupabaseManager implements IEmployeeManager {
    async loginWithEmailAndPassword(email: string, password: string): Promise<Employee | null> {
        const { data, error } = await this.from()?.select("*").eq("email", email).single() || nullPlaceholder
        const newData = returnCheck<any>(data, error)
        if (newData != null) {
            if (newData.password == password) {
                return newData
            }
        }
        return null
    }

    async getByBranchId(branchId: number): Promise<Employee[] | null> {
        const { data, error } = await this.from()?.select().eq("branch_id", branchId) || nullPlaceholder
        return returnCheck(data, error)
    }

    async getAll(): Promise<Employee[] | null> {
        const { data, error } = await this.from()?.select() || nullPlaceholder
        return returnCheck(data, error)
    }

    async getById(id: number): Promise<Employee | null> {
        const { data, error } = await this.from()?.select().eq("id", id).single() || nullPlaceholder
        return returnCheck(data, error)
    }

    async add(model: EmployeeInsert): Promise<Employee | null> {
        model.created_at = new Date().toJSON()
        const { data, error } = await this.from()?.insert(model).select().single() || nullPlaceholder
        return returnCheck(data, error)
    }

    async update(model: EmployeeUpdate): Promise<Employee | null> {
        model.updated_at = new Date().toJSON()
        const { data, error } = await this.from()?.update(model).eq("id", model.id).select().single() || nullPlaceholder
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
        return Supabase.client?.from("Employee")
    }
}
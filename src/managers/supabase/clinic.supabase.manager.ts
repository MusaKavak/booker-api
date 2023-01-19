import { Clinic, ClinicInsert, ClinicUpdate } from "src/models/clinic";
import { Supabase } from "src/supabase.client";
import { autoInjectable } from "tsyringe";
import { IClinicManager } from "../interfaces/i.clinic.manager";
import { nullPlaceholder, returnCheck } from "./tools";

@autoInjectable()
export class ClinicSupabaseManager implements IClinicManager {

    async getByDoctorId(employeeId: number): Promise<Clinic[] | null> {
        const { data, error } = await this.from()?.select().eq("doctor_id", employeeId) || nullPlaceholder
        return returnCheck(data, error)
    }

    async getByAssistantId(employeeId: number): Promise<Clinic[] | null> {
        const { data, error } = await this.from()?.select().eq("assistant_id", employeeId) || nullPlaceholder
        return returnCheck(data, error)
    }

    async getByBranchId(branchId: number): Promise<Clinic[] | null> {
        const { data, error } = await this.from()?.select().eq("branch_id", branchId) || nullPlaceholder
        return returnCheck(data, error)
    }

    async getAll(): Promise<Clinic[] | null> {
        const { data, error } = await this.from()?.select() || nullPlaceholder
        return returnCheck(data, error)
    }

    async getById(id: number): Promise<Clinic | null> {
        const { data, error } = await this.from()?.select().eq("id", id).single() || nullPlaceholder
        return returnCheck(data, error)
    }

    async add(model: ClinicInsert): Promise<Clinic | null> {
        model.created_at = new Date().toJSON()
        const { data, error } = await this.from()?.insert(model).select().single() || nullPlaceholder
        return returnCheck(data, error)
    }

    async update(model: ClinicUpdate): Promise<Clinic | null> {
        model.updated_at = new Date().toJSON()
        const { data, error } = await this.from()?.update(model).select().single() || nullPlaceholder
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
        return Supabase.client?.from("Clinic")
    }
}
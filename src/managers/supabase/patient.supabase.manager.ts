import { Patient, PatientInsert, PatientUpdate } from "src/models/patient";
import { Supabase } from "src/supabase.client";
import { autoInjectable } from "tsyringe";
import { IPatientManager } from "../interfaces/i.patient.manager";
import { nullPlaceholder, returnCheck } from "./tools";

@autoInjectable()
export class PatientSupabaseManager implements IPatientManager {

    async getAll(): Promise<Patient[] | null> {
        const { data, error } = await this.from()?.select() || nullPlaceholder
        return returnCheck(data, error)
    }

    async getById(id: number): Promise<Patient | null> {
        const { data, error } = await this.from()?.select().eq("id", id).single() || nullPlaceholder
        return returnCheck(data, error)
    }

    async add(model: PatientInsert): Promise<Patient | null> {
        model.created_at = new Date().toJSON()
        const { data, error } = await this.from()?.insert(model).select().single() || nullPlaceholder
        return returnCheck(data, error)
    }

    async update(model: PatientUpdate): Promise<Patient | null> {
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
        return Supabase.client?.from("Patient")
    }
}
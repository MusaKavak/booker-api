import { Appointment, AppointmentInsert, AppointmentUpdate } from "src/models/appointment";
import { Supabase } from "src/supabase.client";
import { autoInjectable } from "tsyringe";
import { IAppointmentManager } from "../interfaces/i.appointment.manager";
import { nullPlaceholder, returnCheck } from "./tools";

@autoInjectable()
export class AppointmentSupabaseManager implements IAppointmentManager {

    async getByPatientId(patientId: number): Promise<Appointment[] | null> {
        const { data, error } = await this.from()?.select().eq("patient_id", patientId) || nullPlaceholder
        return returnCheck(data, error)
    }

    async getByClinicId(clinicId: number): Promise<Appointment[] | null> {
        const { data, error } = await this.from()?.select().eq("clinic_id", clinicId) || nullPlaceholder
        return returnCheck(data, error)
    }

    async getAll(): Promise<Appointment[] | null> {
        const { data, error } = await this.from()?.select() || nullPlaceholder
        return returnCheck(data, error)
    }

    async getById(id: number): Promise<Appointment | null> {
        const { data, error } = await this.from()?.select().eq("id", id).single() || nullPlaceholder
        return returnCheck(data, error)
    }

    async add(model: AppointmentInsert): Promise<Appointment | null> {
        model.created_at = new Date().toJSON()
        const { data, error } = await this.from()?.insert(model).select().single() || nullPlaceholder
        return returnCheck(data, error)
    }
    async update(model: AppointmentUpdate): Promise<Appointment | null> {
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
        return Supabase.client?.from("Appointment")
    }

}
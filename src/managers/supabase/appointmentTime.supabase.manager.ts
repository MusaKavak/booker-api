import { AppointmentTime, AppointmentTimeInsert, AppointmentTimeUpdate } from "src/models/appointmentTime";
import { Supabase } from "src/supabase.client";
import { autoInjectable } from "tsyringe";
import { IAppointmentTimeManager } from "../interfaces/i.appointmentTime.manager";
import { nullPlaceholder, returnCheck } from "./tools";

@autoInjectable()
export class AppointmentTimeSupabaseManager implements IAppointmentTimeManager {

    async getByClinicId(clinicId: number): Promise<AppointmentTime[] | null> {
        const { data, error } = await this.from()?.select().eq("clinic_id", clinicId) || nullPlaceholder
        return returnCheck(data, error)
    }

    async getAll(): Promise<AppointmentTime[] | null> {
        const { data, error } = await this.from()?.select() || nullPlaceholder
        return returnCheck(data, error)
    }
    async getById(id: number): Promise<AppointmentTime | null> {
        const { data, error } = await this.from()?.select().eq("id", id).single() || nullPlaceholder
        return returnCheck(data, error)

    }
    async add(model: AppointmentTimeInsert): Promise<AppointmentTime | null> {
        model.created_at = new Date().toJSON()
        const { data, error } = await this.from()?.insert(model).select().single() || nullPlaceholder
        return returnCheck(data, error)

    }
    async update(model: AppointmentTimeUpdate): Promise<AppointmentTime | null> {
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
        return Supabase.client?.from("AppointmentTime")
    }
}
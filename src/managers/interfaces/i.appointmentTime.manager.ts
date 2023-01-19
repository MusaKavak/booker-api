import { AppointmentTime, AppointmentTimeInsert, AppointmentTimeUpdate } from "src/models/appointmentTime";
import { IBaseManager } from "../i.base.manager";

export interface IAppointmentTimeManager extends IBaseManager<AppointmentTime, AppointmentTimeInsert, AppointmentTimeUpdate, AppointmentTime["id"]> {
    getByClinicId(clinicId: number): Promise<AppointmentTime[] | null>
}
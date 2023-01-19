import { Appointment, AppointmentInsert, AppointmentUpdate } from "src/models/appointment";
import { IBaseManager } from "../i.base.manager";

export interface IAppointmentManager extends IBaseManager<Appointment, AppointmentInsert, AppointmentUpdate, Appointment["id"]> {

    getByPatientId(patientId: number): Promise<Appointment[] | null>

    getByClinicId(clinicId: number): Promise<Appointment[] | null>

}
import { Clinic, ClinicInsert, ClinicUpdate } from "src/models/clinic";
import { IBaseManager } from "../i.base.manager";

export interface IClinicManager extends IBaseManager<Clinic, ClinicInsert, ClinicUpdate, Clinic["id"]> {

    getByDoctorId(employeeId: number): Promise<Clinic[] | null>

    getByAssistantId(employeeId: number): Promise<Clinic[] | null>

    getByBranchId(branchId: number): Promise<Clinic[] | null>

}
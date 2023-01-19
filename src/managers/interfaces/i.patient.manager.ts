import { Patient, PatientInsert, PatientUpdate } from "src/models/patient";
import { IBaseManager } from "../i.base.manager";

export interface IPatientManager extends IBaseManager<Patient, PatientInsert, PatientUpdate, Patient["id"]> {

}
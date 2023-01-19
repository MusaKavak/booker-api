import "reflect-metadata"
import { Express } from "express";
import { EmployeesController } from "./employees.controller";
import { EmployeeSupabaseManager } from "src/managers/supabase/employee.supabase.manager";
import { AppointmentsController } from "./appointments.controller";
import { AppointmentSupabaseManager } from "src/managers/supabase/appointment.supabase.manager";
import { AppointmentTimesController } from "./appointmentTimes.controller";
import { AppointmentTimeSupabaseManager } from "src/managers/supabase/appointmentTime.supabase.manager";
import { BranchesController } from "./branches.controller";
import { BrachSupabaseManager } from "src/managers/supabase/brach.supabase.manager";
import { ClinicsController } from "./clinics.controller";
import { ClinicSupabaseManager } from "src/managers/supabase/clinic.supabase.manager";
import { EmployeeRanksController } from "./employeeRanks.controller";
import { EmployeeRankSupabaseManager } from "src/managers/supabase/employeeRank.supabase.manager";
import { PatientsController } from "./patients.controller";
import { PatientSupabaseManager } from "src/managers/supabase/patient.supabase.manager";
import { RanksController } from "./ranks.controller";
import { RankSupabaseManagaer } from "src/managers/supabase/rank.supabase.manager";
import { ToolsController } from "./tools.controller";

export function bindControllers(app: Express) {
    new AppointmentsController(app, AppointmentSupabaseManager)
    new AppointmentTimesController(app, AppointmentTimeSupabaseManager)
    new BranchesController(app, BrachSupabaseManager)
    new ClinicsController(app, ClinicSupabaseManager)
    new EmployeesController(app, EmployeeSupabaseManager)
    new EmployeeRanksController(app, EmployeeRankSupabaseManager)
    new PatientsController(app, PatientSupabaseManager)
    new RanksController(app, RankSupabaseManagaer)
    new ToolsController(app)
}
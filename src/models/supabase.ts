import { Appointment, AppointmentInsert, AppointmentUpdate } from "./appointment"
import { AppointmentTime, AppointmentTimeInsert, AppointmentTimeUpdate } from "./appointmentTime"
import { Branch, BranchInsert, BranchUpdate } from "./branch"
import { Employee, EmployeeInsert, EmployeeUpdate } from "./employee"
import { EmployeeRank, EmployeeRankInsert, EmployeeRankUpdate } from "./employeeRank"
import { Patient, PatientInsert, PatientUpdate } from "./patient"
import { Clinic, ClinicInsert, ClinicUpdate } from "./clinic"
import { Rank, RankInsert, RankUpdate } from "./rank"

export interface SupabaseDatabase {
  public: {
    Tables: {
      Appointment: {
        Row: Appointment
        Insert: AppointmentInsert
        Update: AppointmentUpdate
      }
      AppointmentTime: {
        Row: AppointmentTime
        Insert: AppointmentTimeInsert
        Update: AppointmentTimeUpdate
      }
      Branch: {
        Row: Branch
        Insert: BranchInsert
        Update: BranchUpdate
      }
      Employee: {
        Row: Employee
        Insert: EmployeeInsert
        Update: EmployeeUpdate
      }
      EmployeeRank: {
        Row: EmployeeRank
        Insert: EmployeeRankInsert
        Update: EmployeeRankUpdate
      }
      Patient: {
        Row: Patient
        Insert: PatientInsert
        Update: PatientUpdate
      }
      Clinic: {
        Row: Clinic
        Insert: ClinicInsert
        Update: ClinicUpdate
      }
      Rank: {
        Row: Rank
        Insert: RankInsert
        Update: RankUpdate
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

import { Employee, EmployeeInsert, EmployeeUpdate } from "src/models/employee"
import { IBaseManager } from "../i.base.manager"

export interface IEmployeeManager extends IBaseManager<Employee, EmployeeInsert, EmployeeUpdate, Employee["id"]> {
    getByBranchId(branchId: number): Promise<Employee[] | null>
    loginWithEmailAndPassword(email: string, password: string): Promise<Employee | null>
}
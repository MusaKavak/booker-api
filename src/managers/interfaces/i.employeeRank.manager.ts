import { Employee } from "src/models/employee";
import { EmployeeRank, EmployeeRankInsert, EmployeeRankUpdate } from "src/models/employeeRank";
import { Rank } from "src/models/rank";
import { IBaseManager } from "../i.base.manager";

export interface IEmployeeRankManager extends IBaseManager<EmployeeRank, EmployeeRankInsert, EmployeeRankUpdate, EmployeeRank["id"]> {

    getEmployeesByRankId(rankId: number): Promise<any[] | null>
    getRanksByEmployeeId(employeeId: number): Promise<any[] | null>
}
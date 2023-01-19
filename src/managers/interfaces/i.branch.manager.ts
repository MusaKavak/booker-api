import { Branch, BranchInsert, BranchUpdate } from "src/models/branch";
import { IBaseManager } from "../i.base.manager";

export interface IBranchManager extends IBaseManager<Branch, BranchInsert, BranchUpdate, Branch["id"]> {

}
import { Rank, RankInsert, RankUpdate } from "src/models/rank";
import { IBaseManager } from "../i.base.manager";

export interface IRankManager extends IBaseManager<Rank, RankInsert, RankUpdate, Rank["id"]> { }
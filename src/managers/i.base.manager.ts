export interface IBaseManager<T, TInsert, TUpdate, TId> {
    getAll(): Promise<T[] | null>

    getById(id: TId): Promise<T | null>

    add(model: TInsert): Promise<T | null>

    update(model: TUpdate): Promise<T | null>

    deleteById(id: TId): Promise<boolean>
}
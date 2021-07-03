interface IBaseRepository<TData>
{
    store(key: string, data: TData): void
    get(key: string): TData|null
    delete(key: string): void
}

export default IBaseRepository
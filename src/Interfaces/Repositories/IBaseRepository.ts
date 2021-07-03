interface IBaseRepository<TData>
{
    store(key: string, data: TData): void
    get(key: string): TData|null
}

export default IBaseRepository
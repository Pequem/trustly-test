interface IBaseObjectModel
{
    getName(): string,
    setName(name: string): void,
    getUrl(): string,
    setUrl(url: string): void
    isDirectory(): boolean
}

export default IBaseObjectModel
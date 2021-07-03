import { injectable } from "inversify"
import IBaseObjectModel from "../Interfaces/Models/IBaseObjectModel"

@injectable()
class BaseObjectModel implements IBaseObjectModel
{
    private name: string
    private url: string

    constructor(name: string = '', url: string = '')
    {
        this.name = name
        this.url = url
    }

    getName(): string
    {
        return this.name
    }

    setName(name: string): void
    {
        this.name = name
    }

    getUrl(): string
    {
       return this.url
    }

    setUrl(url: string): void
    {
        this.url = url
    }

    isDirectory(): boolean
    {
        return false;
    }
}

export default BaseObjectModel
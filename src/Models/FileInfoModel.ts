import { injectable } from "inversify"
import IFileInfoModel from "../Interfaces/Models/IFileInfoModel"
import BaseObjectModel from "./BaseObjectModel"

@injectable()
class FileInfoModel extends BaseObjectModel implements IFileInfoModel
{
    private extension: string
    private lines: number
    private bytes: number

    constructor(name: string = '', url: string = '', extension: string = '', lines: number = 0, bytes: number = 0)
    {
        super(name, url)
        
        this.extension = extension
        this.lines = lines
        this.bytes = bytes
    }

    getExtension(): string
    {
        return this.extension
    }
    
    setExtension(extension: string): void
    {
        this.extension = extension
    }
    
    getLines(): number
    {
        return this.lines
    }
    
    setLines(lines: number): void
    {
        this.lines = lines
    }
    
    getBytes(): number
    {
        return this.bytes
    }
    
    setBytes(bytes: number): void
    {
        this.bytes = bytes
    }
}

export default FileInfoModel
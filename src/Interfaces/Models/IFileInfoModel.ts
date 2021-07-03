import IBaseObjectModel from "./IBaseObjectModel";

interface IFileInfoModel extends IBaseObjectModel
{
    getExtension(): string,
    setExtension(extension: string): void,
    getLines(): number,
    setLines(lines: number): void,
    getBytes(): number,
    setBytes(bytes: number): void
}

export default IFileInfoModel
import IFileInfoModel from "../Models/IFileInfoModel";
import IBaseObjectModel from "../Models/IBaseObjectModel";

interface IGithubHtmlParserService
{
    getObjects(html: string): Promise<IBaseObjectModel[]>
    hydrateFile(file: IFileInfoModel, html: string): Promise<IFileInfoModel>
}

export default IGithubHtmlParserService
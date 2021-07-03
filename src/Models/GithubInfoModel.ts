import { injectable } from "inversify"
import IFileInfoModel from "../Interfaces/Models/IFileInfoModel"
import IGithubInfoModel from "../Interfaces/Models/IGithubInfoModel"
import IGithubStatisticsModel from "../Interfaces/Models/IGithubStatisticsModel"

@injectable()
class GithubInfoModel implements IGithubInfoModel
{
    private url: string
    private files: IFileInfoModel[]
    private statistics: IGithubStatisticsModel[] = []

    constructor(url: string = '', files: IFileInfoModel[] = [])
    {
        this.url = url
        this.files = files
    }

    getGithubRepoStatistics(): IGithubStatisticsModel[]
    {
        return this.statistics
    }

    setGithubRepoStatistics(statistics: IGithubStatisticsModel[]): void
    {
        this.statistics = statistics
    }

    getUrl(): string
    {
        return this.url
    }

    setUrl(url: string): void
    {
        this.url = url
    }

    getFiles(): IFileInfoModel[] 
    {
        return this.files
    }

    setFiles(files: IFileInfoModel[]): void
    {
        this.files = files
    }
}

export default GithubInfoModel
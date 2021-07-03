import IFileInfoModel from './IFileInfoModel'
import IGithubRepoStatistics from './IGithubStatisticsModel'

interface IGithubInfoModel
{
    getUrl(): string,
    setUrl(url: string): void,
    getFiles(): IFileInfoModel[],
    setFiles(files: IFileInfoModel[]): void
    getGithubRepoStatistics(): IGithubRepoStatistics[]
    setGithubRepoStatistics(statistics: IGithubRepoStatistics[]): void
}

export default IGithubInfoModel
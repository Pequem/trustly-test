import IGithubInfoModel from "../Interfaces/Models/IGithubInfoModel";
import IGithubStatisticsModel from "../Interfaces/Models/IGithubStatisticsModel";
import IGithubRepoStatisticsService from "../Interfaces/Services/IGithubRepoStatisticsService"
import container from '../DIContainer'
import { injectable } from "inversify";

@injectable()
class GithubRepoStatisticsService implements IGithubRepoStatisticsService
{

    private getExtensions(infos: IGithubInfoModel): string[]
    {
        let ext: string[] = []

        infos.getFiles().forEach(file => {
            if(!ext.includes(file.getExtension())){
                ext.push(file.getExtension())
            }
        })

        return ext
    }

    private calcule(info: IGithubInfoModel, ext: string): IGithubStatisticsModel
    {
        let githubStatisticsModel: IGithubStatisticsModel = container.get<IGithubStatisticsModel>('IGithubStatisticsModel')
        let lines: number = 0
        let count: number = 0
        let bytes: number = 0
        
        githubStatisticsModel.setExtension(ext)

        info.getFiles().filter(f => {
            return f.getExtension().localeCompare(ext) == 0
        }).forEach(f => {
            count++
            lines += f.getLines()
            bytes += f.getBytes()
        })

        githubStatisticsModel.setCount(count)
        githubStatisticsModel.setLines(lines)
        githubStatisticsModel.setBytes(bytes)

        return githubStatisticsModel
    }

    public hydrate(githubInfo: IGithubInfoModel): IGithubInfoModel {
        
        let extensions = this.getExtensions(githubInfo)
        let githubStatisticsModel: IGithubStatisticsModel[] = []
        
        extensions.forEach(ext => {
            githubStatisticsModel.push(this.calcule(githubInfo, ext))
        })

        githubInfo.setGithubRepoStatistics(githubStatisticsModel)

        return githubInfo
    }
}

export default GithubRepoStatisticsService
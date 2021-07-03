import 'reflect-metadata'
import container from '../src/DIContainer'
import IFileInfoModel from '../src/Interfaces/Models/IFileInfoModel'
import IGithubInfoModel from '../src/Interfaces/Models/IGithubInfoModel'
import IGithubStatisticsModel from '../src/Interfaces/Models/IGithubStatisticsModel'
import IGithubRepoStatisticsService from '../src/Interfaces/Services/IGithubRepoStatisticsService'

function generateFiles(lines: number, size: number, extension: string): IFileInfoModel
{
    let file: IFileInfoModel = container.get<IFileInfoModel>("IFileInfoModel")
    file.setLines(lines)
    file.setExtension(extension)
    file.setBytes(size)

    return file
}

function generateExpectedValues(totals: {[key:string]:{lines: number, size: number, count: number}}): IGithubStatisticsModel[]
{
    let statistics: IGithubStatisticsModel[] = []

    Object.keys(totals).forEach(key => {
        let statistic: IGithubStatisticsModel = container.get<IGithubStatisticsModel>("IGithubStatisticsModel")

        statistic.setExtension(key)
        statistic.setBytes(totals[key].size)
        statistic.setCount(totals[key].count)
        statistic.setLines(totals[key].lines)

        statistics.push(statistic)
    })

    return statistics
}

function compareByExtension(a: IGithubStatisticsModel, b: IGithubStatisticsModel): number
{
    return a.getExtension().localeCompare(b.getExtension())
}

describe("Test repo statistics calculate", () => {
    it("Generate files and compare with expected", () => {
        let service: IGithubRepoStatisticsService = container.get<IGithubRepoStatisticsService>("IGithubRepoStatisticsService")
        let gitHubInfo: IGithubInfoModel = container.get<IGithubInfoModel>("IGithubInfoModel")
        let fileInfos: IFileInfoModel[] = []
        let extensions: string[] = ['json', 'java', 'c', 'cs']
        let totals: {[key:string]:{lines: number, size: number, count: number}} = {}

        // Generate random data
        for(let i = 0; i < 100; i++){
            let size = Math.random() * 1000
            let lines = Math.floor(Math.random() * 1000)
            let extension = extensions[Math.floor(Math.random() * 3)]

            if(!Object.keys(totals).includes(extension)){
                totals[extension] = {
                                lines: 0,
                                size: 0,
                                count: 0
                            }
            }

            totals[extension].lines += lines
            totals[extension].size += size
            totals[extension].count++
        
            fileInfos.push(generateFiles(lines, size, extension))
        }

        //Call service
        gitHubInfo.setFiles(fileInfos)
        gitHubInfo = service.hydrate(gitHubInfo)
        
        expect(
                gitHubInfo.getGithubRepoStatistics().sort(compareByExtension)
            ).toStrictEqual(
                generateExpectedValues(totals).sort(compareByExtension)
            )
    })
})
import 'reflect-metadata'
import IGithubScraperService from "../Interfaces/Services/IGithubScraperService"
import IGithubInfoModel from "../Interfaces/Models/IGithubInfoModel"
import GithubInfoModel from "../Models/GithubInfoModel"
import { inject, injectable } from "inversify"
import IPageGetService from '../Interfaces/Services/IPageGetService'
import IDirectoryModel from '../Interfaces/Models/IDirectoryModel'
import IGithubHtmlParserService from '../Interfaces/Services/IGithubHtmlParseService'
import IFileInfoModel from '../Interfaces/Models/IFileInfoModel'
import IBaseObjectModel from '../Interfaces/Models/IBaseObjectModel'
import IGithubInfoRepository from '../Interfaces/Repositories/IGithubInfoRepository'
import IGithubRepoStatisticsService from '../Interfaces/Services/IGithubRepoStatisticsService'

@injectable()
class GithubScraperService implements IGithubScraperService
{
    private pageGet: IPageGetService
    private githubHtmlParse: IGithubHtmlParserService
    private githubInfoRepository: IGithubInfoRepository
    private githubRepoStatisticsService: IGithubRepoStatisticsService

    constructor(
        @inject('IPageGetService') pageGet: IPageGetService,
        @inject('IGithubHtmlParseService') githubHtmlParse: IGithubHtmlParserService,
        @inject('IGithubInfoRepository') githubInfoRepository: IGithubInfoRepository,
        @inject('IGithubRepoStatisticsService') githubRepoStatisticsService: IGithubRepoStatisticsService
    ) {
        this.pageGet = pageGet
        this.githubHtmlParse = githubHtmlParse
        this.githubInfoRepository = githubInfoRepository
        this.githubRepoStatisticsService = githubRepoStatisticsService
    }

    private parseGitUrl(url: string): string
    {
        if(url.indexOf('github.com') >= 0){
            return url
        } else {
            return "https://github.com"+url
        }
    }

    private async getAllFiles(url: string): Promise<IFileInfoModel[]>
    {
        let objects: IBaseObjectModel[] = await this.githubHtmlParse.getObjects(await this.pageGet.getHtml(this.parseGitUrl(url)))
        let files: IFileInfoModel[] = []
        let promises: Promise<IBaseObjectModel[]>[] = []

        objects.forEach((object: IBaseObjectModel) => {
            if(object.isDirectory()){
                promises.push(this.getAllFiles(object.getUrl()))
            }else{
                files.push(<IFileInfoModel> object)
            }
        })

        let results = await Promise.all(promises)
        
        results.forEach(result => {
            files = files.concat(<IFileInfoModel[]> result)
        })

        return files
    }

    private extractExtension(file: IFileInfoModel): string
    {
        let tokens: string[] = file.getName().split('.')
        
        return tokens[tokens.length - 1].trim()
    }

    private async hydrateFile(file: IFileInfoModel): Promise<IFileInfoModel>
    {
        let html: string = await this.pageGet.getHtml(this.parseGitUrl(file.getUrl()))

        file = await this.githubHtmlParse.hydrateFile(file, html)
        file.setExtension(this.extractExtension(file))

        return file
    }

    private async hydrateFiles(files: IFileInfoModel[]): Promise<IFileInfoModel[]>
    {
        let hydratedFiles: IFileInfoModel[] = []

        for(let file of files){
            hydratedFiles.push(await this.hydrateFile(file))
        }

        return files
    }

    private async fetchInfo(url: string):  Promise<IGithubInfoModel>
    {
        let githubInfo: IGithubInfoModel = new GithubInfoModel()
        let files = await this.getAllFiles(url)

        githubInfo.setUrl(url)
        githubInfo.setFiles(await this.hydrateFiles(files))

        return githubInfo;
    }

    public async getRepoInfo(url: string): Promise<IGithubInfoModel>
    {
        url = url.trim()
        let githubInfo: IGithubInfoModel|null = this.githubInfoRepository.get(url)

        if(githubInfo == null){
            githubInfo = await this.fetchInfo(url)
            
            githubInfo = this.githubRepoStatisticsService.hydrate(githubInfo)
            
            this.githubInfoRepository.store(url, githubInfo)
        }

        return githubInfo
    }
}

export default GithubScraperService
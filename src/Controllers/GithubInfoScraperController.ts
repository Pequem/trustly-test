import {Request, Response} from 'express'
import 'reflect-metadata'
import {inject, injectable} from 'inversify'
import IGithubScraperService from '../Interfaces/Services/IGithubScraperService'
import container from '../DIContainer'

@injectable()
class GithubInfoScraperController
{
    private githubScraperService: IGithubScraperService

    constructor(
        @inject('IGithubScraperService') githubScraperService: IGithubScraperService
    ) {
        this.githubScraperService = githubScraperService
    }

    public async doScraper(req: Request, res: Response)
    {
        try{
            if(req.body.url){
                let githubInfo = await this.githubScraperService.getRepoInfo(req.body.url)

                return res.json(githubInfo.getGithubRepoStatistics())
            }
            return res.status(500).send('Missing url')
        }catch(error){
            return res.status(500).send(error.message)
        }
    }
}

export default container.resolve(GithubInfoScraperController)
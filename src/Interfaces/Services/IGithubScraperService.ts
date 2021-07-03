import IGithubInfoModel from '../Models/IGithubInfoModel'

interface IGithubScraperService
{
    getRepoInfo(url: string): Promise<IGithubInfoModel>
}

export default IGithubScraperService
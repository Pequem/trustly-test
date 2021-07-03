import IGithubInfoModel from "../Models/IGithubInfoModel";

interface IGithubRepoStatisticsService
{
    hydrate(githubInfo: IGithubInfoModel): IGithubInfoModel
}

export default IGithubRepoStatisticsService
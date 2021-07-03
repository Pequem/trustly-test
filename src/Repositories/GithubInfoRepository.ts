import IGithubInfoRepository from "../Interfaces/Repositories/IGithubInfoRepository"
import IGithubInfoModel from "../Interfaces/Models/IGithubInfoModel"
import BaseRepository from './BaseRepository'
import { injectable } from "inversify"

@injectable()
class GithubInfoRepository extends BaseRepository<IGithubInfoModel|Promise<IGithubInfoModel>>
{

}

export default GithubInfoRepository
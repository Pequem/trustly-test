import IBaseRepository from './IBaseRepository'
import IGithubInfoModel from '../Models/IGithubInfoModel'

interface IGithubInfoRepository extends IBaseRepository<IGithubInfoModel|Promise<IGithubInfoModel>>
{

}

export default IGithubInfoRepository
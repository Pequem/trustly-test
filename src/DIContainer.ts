import { Container } from "inversify"
import IDirectoryModel from "./Interfaces/Models/IDirectoryModel"
import IGithubHtmlParserService from "./Interfaces/Services/IGithubHtmlParseService"
import IGithubScraperService from "./Interfaces/Services/IGithubScraperService"
import IPageGetService from "./Interfaces/Services/IPageGetService"
import GithubHtmlParseService from "./Services/GithubHtmlParseService"
import GithubScraperService from "./Services/GithubScraperService"
import PageGetService from "./Services/PageGetService"
import DirectoryModel from './Models/DirectoryModel'
import IFileInfoModel from "./Interfaces/Models/IFileInfoModel"
import FileInfoModel from "./Models/FileInfoModel"
import IGithubInfoRepository from "./Interfaces/Repositories/IGithubInfoRepository"
import GithubInfoRepository from "./Repositories/GithubInfoRepository"
import IGithubRepoStatisticsService from "./Interfaces/Services/IGithubRepoStatisticsService"
import GithubRepoStatisticsService from "./Services/GithubReposStatisticsService"
import IGithubStatisticsModel from "./Interfaces/Models/IGithubStatisticsModel"
import GithubStatisticsModel from "./Models/GithubStatisticsModel"
import IGithubInfoModel from "./Interfaces/Models/IGithubInfoModel"
import GithubInfoModel from "./Models/GithubInfoModel"


// Here I setup the DIContainer to use Dependency Inversion

const container = new Container()

// I pass a string to bind method because typescript does not support Interface notation, so the
// DIContainer resolves dependencies by symbol
container.bind<IFileInfoModel>('IFileInfoModel').to(FileInfoModel)
container.bind<IGithubScraperService>('IGithubScraperService').to(GithubScraperService)
container.bind<IPageGetService>('IPageGetService').to(PageGetService)
container.bind<IGithubHtmlParserService>('IGithubHtmlParseService').to(GithubHtmlParseService)
container.bind<IDirectoryModel>('IDirectoryModel').to(DirectoryModel)
container.bind<IGithubInfoRepository>('IGithubInfoRepository').to(GithubInfoRepository)
container.bind<IGithubStatisticsModel>('IGithubStatisticsModel').to(GithubStatisticsModel)
container.bind<IGithubRepoStatisticsService>('IGithubRepoStatisticsService').to(GithubRepoStatisticsService)
container.bind<IGithubInfoModel>('IGithubInfoModel').to(GithubInfoModel)

export default container
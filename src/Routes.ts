import {Router} from 'express'
import GithubInfoScraperController from './Controllers/GithubInfoScraperController'

const routes = Router()

routes.post('/', GithubInfoScraperController.doScraper.bind(GithubInfoScraperController))

export default routes
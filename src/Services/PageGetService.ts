import IPageGetService from "../Interfaces/Services/IPageGetService"
import axios from 'axios'
import { injectable } from "inversify"

@injectable()
class PageGetService implements IPageGetService
{
    private checkIfExitsHttp(url: string): boolean
    {
        return url.indexOf('http') !== -1
    }

    private appendHttp(url: string): string
    {
        return 'http://'+url
    }

    public async getHtml(url: string): Promise<string>
    {
        try{
            let result = await axios.get(this.checkIfExitsHttp(url) ? url : this.appendHttp(url))
            return result.data
        }catch(e){
            throw new Error('Cannot get the page:'+url)
        }
    }
}

export default PageGetService
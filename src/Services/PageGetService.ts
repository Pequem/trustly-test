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
        for(let i = 1; i < 4; i++){
            try{
                let result = await axios.get(this.checkIfExitsHttp(url) ? url : this.appendHttp(url))
                return result.data
            }catch(e){
                console.log('sleep')
                console.log(2000 * i)
                await new Promise(resolve => setTimeout(resolve, 2000 * i))
            }
        }
        throw new Error('Cannot get the page:'+url)
    }
}

export default PageGetService
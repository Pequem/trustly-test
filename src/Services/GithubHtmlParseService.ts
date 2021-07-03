import IDirectoryModel from "../Interfaces/Models/IDirectoryModel";
import IGithubHtmlParse from "../Interfaces/Services/IGithubHtmlParseService"
import jsdom from 'jsdom'
import { injectable } from "inversify";
import IBaseObjectModel from "../Interfaces/Models/IBaseObjectModel";
import container from '../DIContainer'
import IFileInfoModel from "../Interfaces/Models/IFileInfoModel";

/*
* I tried doing this with regex but gave up because i couldn't find the correct closing tag.
*/

@injectable()
class GithubHtmlParseService implements IGithubHtmlParse
{
    private extractDomItems(dom: jsdom.JSDOM)
    {
        return dom.window.document.querySelectorAll(
            "div.Box-row.Box-row--focus-gray.py-2.d-flex.position-relative.js-navigation-item"
            )
    }

    private isDirectory(node: Element): Boolean
    {
        return node.querySelector('.octicon-file-directory') !== null
    }

    private parseDirectory(node: Element): IDirectoryModel
    {
        let directory: IDirectoryModel = container.get<IDirectoryModel>('IDirectoryModel')
        let aElement: HTMLLinkElement|null = node.querySelector(
            "div.flex-auto.min-width-0.col-md-2.mr-3 > span > a"
        )
        
        if(aElement){
            directory.setName(aElement.innerHTML.trim())
            directory.setUrl(aElement.href)
            return directory
        }
        throw new Error('Invalid directory dom')
    }

    private parseFile(node: Element): IFileInfoModel
    {
        let fileInfo: IFileInfoModel = container.get<IFileInfoModel>('IFileInfoModel')
        let aElement: HTMLLinkElement|null = node.querySelector(
            "div.flex-auto.min-width-0.col-md-2.mr-3 > span > a"
        )

        if(aElement){
            fileInfo.setName(aElement.innerHTML.trim())
            fileInfo.setUrl(aElement.href)
            return fileInfo
        }
        throw new Error('invalid file dom')

    }

    private parseDomItems(nodes:  NodeListOf<Element>): IBaseObjectModel[]
    {
        let objects: IBaseObjectModel[] = []
        
        nodes.forEach((node: Element) => {
            if(this.isDirectory(node)){
                objects.push(this.parseDirectory(node))
            }else{
                objects.push(this.parseFile(node))
            }
        })

        return objects
    }

    private async parserHtml(html: string)
    {
        return new jsdom.JSDOM(html)
    }
    
    public async getObjects(html: string): Promise<IBaseObjectModel[]>
    {
        let dom = await this.parserHtml(html)

        return this.parseDomItems(this.extractDomItems(dom))

    }

    private getFileInfo(dom: jsdom.JSDOM): string
    {
        let element: HTMLDivElement = <HTMLDivElement> dom.window.document.querySelector("div.text-mono.f6.flex-auto.pr-3.flex-order-2.flex-md-order-1")
        
        if(element){
            return element.innerHTML
        }
        throw new Error('Element not found')
    }

    private convertMeasureToByte(value: number, measure: string): number
    {
        switch(measure.toLowerCase()) {
            case 'kb':
                return value * 1000
            case 'mb':
                return value * 1000 * 1000
            default:
                return value
        }
    }

    private hasLinesInfo(text: string): boolean
    {
        return text.indexOf('line') != -1
    }

    private parserFileInfoText(text: string)
    {
        let pieces: string[] = text.split('<span class="file-info-divider"></span>')
        let linePieces: string[] = []
        let sizePieces: string[] = []

        if(this.hasLinesInfo(text)){
            linePieces = pieces[0].trim().split(' ')
            sizePieces = pieces[1].trim().split(' ')
        }else{
            sizePieces = pieces[0].trim().split(' ')
        }

        let lines: number = parseInt(linePieces.length > 0 ? linePieces[0].trim() : '0')
        let size: number = parseFloat(sizePieces[0].trim())
        let measure: string = sizePieces[1].trim()

        return {
            lines: lines,
            bytes: this.convertMeasureToByte(size, measure)
        }
    }

    public async hydrateFile(file: IFileInfoModel, html: string): Promise<IFileInfoModel>
    {
        let dom: jsdom.JSDOM = await this.parserHtml(html)
        let infos = this.parserFileInfoText(this.getFileInfo(dom))

        file.setBytes(infos.bytes)
        file.setLines(infos.lines)
    
        return file
    }
}

export default GithubHtmlParseService
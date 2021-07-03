import { injectable } from "inversify"
import IGithubStatisticsModel from "../Interfaces/Models/IGithubStatisticsModel"


@injectable()
class GithubStatisticsModel implements IGithubStatisticsModel
{
    private extension: string = ''
    private count: number = 0
    private lines: number = 0
    private bytes: number = 0

    getExtension(): string
    {
        return this.extension
    }

    setExtension(ext: string): void
    {
        this.extension = ext
    }

    getCount(): number
    {
        return this.count
    }

    setCount(count: number): void
    {
        this.count = count
    }

    getLines(): number
    {
        return this.lines
    }

    setLines(lines: number): void
    {
        this.lines = lines
    }

    getBytes(): number
    {
        return this.bytes
    }

    setBytes(bytes: number): void
    {
        this.bytes = bytes
    }
}

export default GithubStatisticsModel
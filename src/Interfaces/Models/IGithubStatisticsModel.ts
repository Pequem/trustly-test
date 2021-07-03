interface IGithubStatisticsModel
{
    getExtension(): string,
    setExtension(ext: string): void,
    getCount(): number,
    setCount(count: number): void
    getLines(): number,
    setLines(lines: number): void
    getBytes(): number,
    setBytes(bytes: number): void
}

export default IGithubStatisticsModel
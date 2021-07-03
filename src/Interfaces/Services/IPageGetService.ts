interface IPageGetService
{
    getHtml(url: string): Promise<string>
}

export default IPageGetService
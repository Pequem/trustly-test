import { injectable } from "inversify"
import IBaseRepository from "../Interfaces/Repositories/IBaseRepository"

@injectable()
class BaseRepository<TData> implements IBaseRepository<TData>
{
    private storage: {key: string, data: TData}[] = []
    
    public delete(key: string): void
    {
        this.storage = this.storage.filter(s => s.key != key)
    }

    public store(key: string, data: TData): void {
        this.delete(key)
        this.storage.push(
            {
                key: key,
                data: data
            }
        )
    }

    public get(key: string): TData|null {
        let reg = this.storage.filter(s => s.key == key)
        
        if(reg.length > 0){
            return reg[0].data
        }else{
            return null
        }

    }
}

export default BaseRepository
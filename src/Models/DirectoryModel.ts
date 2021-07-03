import { injectable } from 'inversify'
import IDirectoryModel from '../Interfaces/Models/IDirectoryModel'
import BaseObjectModel from './BaseObjectModel'

@injectable()
class DirectoryModel extends BaseObjectModel implements IDirectoryModel
{
    isDirectory(): boolean
    {
        return true;
    }
}

export default DirectoryModel
import { AddToolRepository } from '../../../../data/protocols/add-tool-repository'
import { AddToolModel } from '../../../../domain/usecases/add-tools'
import { ToolModel } from '../../../../domain/models/tool'
import { MongoHelper } from '../helpers/mongo-helper'

export class ToolMongoRepository implements AddToolRepository {
  async add(toolData: AddToolModel): Promise<ToolModel> {
    const toolCollection = MongoHelper.getCollection('tools')
    const result = await toolCollection.insertOne(toolData)
    const tool = result.ops[0]
    return MongoHelper.map(tool)
  }
}

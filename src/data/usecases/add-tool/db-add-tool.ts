import { ToolModel } from '../../../domain/models/tool'
import { AddTool, AddToolModel } from '../../../domain/usecases/add-tools'
import { AddToolRepository } from '../../protocols/add-tool-repository'

export class DbAddTool implements AddTool {
  private readonly addToolRepository: AddToolRepository
  constructor(addToolRepository: AddToolRepository) {
    this.addToolRepository = addToolRepository
  }

  async add(toolData: AddToolModel): Promise<ToolModel> {
    const tool = await this.addToolRepository.add(toolData)
    return tool
  }
}

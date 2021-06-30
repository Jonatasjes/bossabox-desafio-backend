import { DbAddTool } from '../../data/usecases/add-tool/db-add-tool'
import { ToolMongoRepository } from '../../infra/db/mongodb/tool-repository/tool'
import { AddToolsController } from '../../presentation/controllers/add-tools'

export const makeAddToolsController = (): AddToolsController => {
  const toolMongoRepository = new ToolMongoRepository()
  const dbAddTool = new DbAddTool(toolMongoRepository)
  return new AddToolsController(dbAddTool)
}

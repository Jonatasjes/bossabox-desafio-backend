import { ToolModel } from '../../../domain/models/tool'
import { AddToolModel } from '../../../domain/usecases/add-tools'
import { AddToolRepository } from '../../protocols/add-tool-repository'
import { DbAddTool } from './db-add-tool'

const makeAddToolRepository = (): AddToolRepository => {
  class AddToolRepositoryStub implements AddToolRepository {
    async add(toolData: AddToolModel): Promise<ToolModel> {
      const fakeTool = {
        id: 'valid_id',
        title: 'valid_title',
        link: 'valid_link',
        description: 'valid_description',
        tags: ['valid_tags']
      }

      return await new Promise(resolve => resolve(fakeTool))
    }
  }

  return new AddToolRepositoryStub()
}

interface SutTypes {
  sut: DbAddTool
  addToolRepository: AddToolRepository
}

const makeSut = (): SutTypes => {
  const addToolRepository = makeAddToolRepository()
  const sut = new DbAddTool(addToolRepository)
  return {
    sut,
    addToolRepository
  }
}

describe('DbAddTool usecase', () => {
  test('Should return a tool on success', async () => {
    const { sut } = makeSut()
    const toolData = {
      title: 'valid_title',
      link: 'valid_link',
      description: 'valid_description',
      tags: ['valid_tags']
    }

    const tool = await sut.add(toolData)
    expect(tool).toEqual({
      id: 'valid_id',
      title: 'valid_title',
      link: 'valid_link',
      description: 'valid_description',
      tags: ['valid_tags']
    })
  })
})

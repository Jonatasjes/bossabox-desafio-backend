import { ToolModel } from '../../domain/models/tool'
import { AddTool, AddToolModel } from '../../domain/usecases/add-tools'
import { InvalidTagsParamError } from '../errors/invalid-tags-params-error'
import { MissingParamsError } from '../errors/missing-params-error'
import { ServerError } from '../errors/server-error'
import { AddToolsController } from './add-tools'

const makeTools = (): AddTool => {
  class AddToolsStub implements AddTool {
    async add(tool: AddToolModel): Promise<ToolModel> {
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

  return new AddToolsStub()
}

interface SutTypes {
  sut: AddToolsController
  addToolsStub: AddTool
}

const makeSut = (): SutTypes => {
  const addToolsStub = makeTools()
  const sut = new AddToolsController(addToolsStub)
  return {
    sut,
    addToolsStub
  }
}

describe('Add tools controller', () => {
  test('Should return 400 if no title is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        link: 'any_link',
        description: 'any_description',
        tags: ['any_tags']
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamsError('title'))
  })

  test('Should return 400 if no link is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        title: 'any_title',
        description: 'any_description',
        tags: ['any_tags']
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamsError('link'))
  })

  test('Should return 400 if no description is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        title: 'any_title',
        link: 'any_link',
        tags: ['any_tags']
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamsError('description'))
  })

  test('Should return 400 if no tags is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        title: 'any_title',
        link: 'any_link',
        description: 'any_description'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamsError('tags'))
  })

  test('Should return 400 if tags is no a array of strings', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        title: 'any_title',
        link: 'any_link',
        description: 'any_description',
        tags: 'invalid_tags'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidTagsParamError())
  })

  test('Should return 500 if AddToolsController throws', async () => {
    const { sut, addToolsStub } = makeSut()
    jest.spyOn(addToolsStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = {
      body: {
        title: 'any_title',
        link: 'any_link',
        description: 'any_description',
        tags: ['any_tags']
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    console.log(httpResponse)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})

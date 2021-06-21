import { MissingParamsError } from '../errors/missing-params-error'
import { AddToolsController } from './add-tools'

interface SutTypes {
  sut: AddToolsController
}

const makeSut = (): SutTypes => {
  const sut = new AddToolsController()
  return {
    sut
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
})

import { MongoHelper } from '../helpers/mongo-helper'
import { ToolMongoRepository } from './tool'

describe('Tool Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const toolCollection = MongoHelper.getCollection('tools')
    await toolCollection.deleteMany({})
  })

  const makeSut = (): ToolMongoRepository => {
    return new ToolMongoRepository()
  }

  test('Should return an account on success', async () => {
    const sut = makeSut()
    const tool = await sut.add({
      title: 'any_title',
      link: 'any_link',
      description: 'any_description',
      tags: ['any_tags']
    })
    expect(tool).toBeTruthy()
    expect(tool.id).toBeTruthy()
    expect(tool.title).toBe('any_title')
    expect(tool.link).toBe('any_link')
    expect(tool.description).toBe('any_description')
    expect(tool.tags).toEqual(['any_tags'])
  })
})

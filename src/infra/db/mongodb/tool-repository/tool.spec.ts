import { MongoHelper } from '../helpers/mongo-helper'
import { ToolMongoRepository } from './tool'

describe('Tool Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return an account on success', async () => {
    const sut = new ToolMongoRepository()
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

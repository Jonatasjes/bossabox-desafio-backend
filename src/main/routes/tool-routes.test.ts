import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

describe('Tools Routes', () => {
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

  test('Shold return an account on success', async () => {
    await request(app)
      .post('/api/v0/tools')
      .send({
        title: 'Teste tools',
        link: 'https://www.google.com.br',
        description: 'Teste de post tools',
        tags: ['tag1', 'tag2', 'tag3']
      })
      .expect(200)
  })
})

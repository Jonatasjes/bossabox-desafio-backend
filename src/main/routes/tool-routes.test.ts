import request from 'supertest'
import app from '../config/app'

describe('Tools Routes', () => {
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

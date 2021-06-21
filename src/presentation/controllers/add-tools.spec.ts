import { MissingParamsError } from '../errors/missing-params-error'
import { AddToolsController } from './add-tools'

describe('Add tools controller', () => {
  test('Should return 400 if no title is provided', async () => {
    const sut = new AddToolsController()
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
})

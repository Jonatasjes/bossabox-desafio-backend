import { InvalidTagsParamError } from '../errors/invalid-tags-params-error'
import { MissingParamsError } from '../errors/missing-params-error'
import { badRequest, serverError } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class AddToolsController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['title', 'link', 'description', 'tags']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamsError(field))
        }
      }

      if (!Array.isArray(httpRequest.body.tags)) {
        return badRequest(new InvalidTagsParamError())
      }
    } catch (error) {
      return serverError()
    }
  }
}

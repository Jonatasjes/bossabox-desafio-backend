import { AddTool } from '../../domain/usecases/add-tools'
import { InvalidTagsParamError } from '../errors/invalid-tags-params-error'
import { MissingParamsError } from '../errors/missing-params-error'
import { badRequest, ok, serverError } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class AddToolsController implements Controller {
  private readonly addTool: AddTool

  constructor(addTool: AddTool) {
    this.addTool = addTool
  }

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

      const { title, link, description, tags } = httpRequest.body

      const tool = await this.addTool.add({
        title,
        link,
        description,
        tags
      })

      return ok(tool)
    } catch (error) {
      console.log('erro')
      return serverError()
    }
  }
}

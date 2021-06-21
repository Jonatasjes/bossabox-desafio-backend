export class InvalidTagsParamError extends Error {
  constructor() {
    super('The tags must be a array of strings')
    this.name = 'InvalidTagsParamError'
  }
}

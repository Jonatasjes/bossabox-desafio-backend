import { HttpResponse } from './http'

export interface Controle<T = any> {
  handle: (request: T) => Promise<HttpResponse>
}

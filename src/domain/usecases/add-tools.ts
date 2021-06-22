import { ToolModel } from '../models/tool'

export interface AddToolModel {
  title: string
  link: string
  description: string
  tags: string[]
}

export interface AddTool {
  add(tool: AddToolModel): Promise<ToolModel>
}

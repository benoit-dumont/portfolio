export type StackTypes = 'Back' | 'Front' | 'Tools'

export type Stack = {
  name: string
  type: StackTypes
}

export type StacksByType = {
  [type: string]: string[]
}

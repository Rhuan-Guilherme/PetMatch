export class ParameterNotFoundError extends Error {
  constructor() {
    super('O parâmetro informado não existe.')
  }
}

export class OrgAlreadyExistsByUserError extends Error {
  constructor() {
    super('O usuário ja possui uma ORG.')
  }
}

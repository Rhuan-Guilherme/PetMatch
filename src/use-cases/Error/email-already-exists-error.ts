export class EmailAlreadyExistsError extends Error{
    constructor(){
        super('O e-mail informando já existe.')
    }
}
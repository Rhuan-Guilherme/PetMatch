# RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar como um usuário;
- [ ] Deve ser possível realizar login como um usuário;
- [ ] Deve ser possível um usuário possuir uma ORG em seu registro;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível cadastrar um pet;
- [ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade;
- [ ] Deve ser possível filtrar pets por suas características;
- [ ] Deve ser possível visualizar detalhes de um pet para adoção

# RNs (Regras de negócio)

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] Para se cadastrar como uma ORG, é nescessario o cadastros de todos os dados solicitados, e apos uma triagem, a ORG é liberada para utlizar a plataforma
- [ ] Uma ORG precisa ter um endereço, um número de WhatsApp, nome dos responsaveis e email ;
- [ ] Para listar os pets, obrigatoriamente precisamos informar a cidade;
- [ ] Um pet deve estar ligado a uma ORG;
- [ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp;
- [ ] Todos os filtros, além da cidade, são opcionais;
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

# RNFs (Requisitos não funcionais)

- [ ] A senhra do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);
## Regras da aplicação

- [ ] Deve ser possível cadastrar um pet
- [ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [ ] Deve ser possível filtrar pets por suas características
- [ ] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se autentificar
- [x] Deve ser possível obter o perfil de um usuário logado
- [x] Deve ser possível se cadastrar como uma ORG

## Regras de negócio

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado
- [ ] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [ ] Uma ORG precisa ter um endereço e um número de WhatsApp
- [ ] Um pet deve estar ligado a uma ORG
- [ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## Regras não-funcionais

- [x] A senha do usuário precisa está criptografada
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgresSQL
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por página
- [ ] O usuário deve ser identificado com um JWT
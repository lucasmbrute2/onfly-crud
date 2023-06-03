# Boas vindas a bordo do Onfly Expenses!
### Aqui você irá encontrar um CRUD de despesas e autenticação de usuários

O projeto está em Nodejs com alguns conceitos de arquitetura em camadas, mas não segue a Clean Architecture a risca, o Controller está acoplado ao express.
 Aqui está um projeto em  [Clean Arch](https://github.com/lucasmbrute2/fs-challenge) como exemplo.
 
 O frontend está em VueJS com o framework Quasar.
 
 
 ## Testes
 
 A maioria dos arquivos que aprensentam funcionalidades possuem testes unitários!
```
npm run test:unit
```
 ![image](https://github.com/lucasmbrute2/onfly-crud/assets/68877260/adb1869c-95a0-4902-b2c0-c6f8405b6188)
 
 ### Como iniciar o projeto
```
- Crie um arquivo .env dentro da pastas 'backend', no front não irá precisar.
- Abra o Docker
- Navegue até a pasta backend, e com as variáveis de ambiente devidamente preenchidas rode o comando "docker-compose up -d"
- Rode o comando 'npm run start:dev'
- Navegue até a pasta frontend, e com as variáveis de ambiente devidamente preenchidas rode o comando 'npm run dev'
```

ps: Deixei as minhas variáveis do Ethereal para disparo de e-mail local, por algum motivo o gmail não tava liberando meu acesso x.x
A cada crição de despesa é enviado um log ao terminal do Backend com uma URL, basta acessa-la.

### O e-mail deve ser assim:
![image](https://github.com/lucasmbrute2/onfly-crud/assets/68877260/e4579bfd-3848-4045-96ff-567290437872)


# Endpoints
Os endpoints de gastos podem ser acesso com o prefixo de rota "/expenses" e de usuários "/users"

POST /users
```
name: string
username: string
password: string
confirmPassword: string
```
![image](https://github.com/lucasmbrute2/onfly-crud/assets/68877260/e7062e9a-d4c3-4f5b-8f73-e6f1d1a33e31)

POST /users/auth
```
username: string
password: string
```
![image](https://github.com/lucasmbrute2/onfly-crud/assets/68877260/7035f2ee-2364-4e1b-b8fc-b2ff5abd6f83)

POST /expenses
```
description: string
cost: number
```
![image](https://github.com/lucasmbrute2/onfly-crud/assets/68877260/553fbc2c-9746-4080-a3f4-0fca69594ac7)

### Os outros endpoints não possuem body obrigatório



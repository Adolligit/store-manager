<h1 align="center">Store Manager</h1>

<p align="justify">
  Store Manager é uma API Rest que busca simular o gerenciamento de dados de uma loja.
</p>
<p align="justify">
  Esta API foi construída em <b>Node.js</b> junto ao <b>Express.js</b> sendo que sua cobertura de teste unitários foi realizada em <b>Mocha</b>, <b>Chai</b> e <b>Sinon</b>. Para consultar os dados no banco, foram feitas query's diretamente no código (<b>"hardcoded"</b>), sendo que elas e a estrutura do banco de dados, foram criados em MySQL.
</p>

## Como eu faço para executar este projeto?

**⚠️ ATENÇÃO ⚠️**
<p align="justify">
É crucial que você já tenha em sua máquina as seguintes ferramentas, com a versão especificada, ou superior:
</p>

- Node.js: v16;
- Docker: v20.10;
- docker-compose: v1.29;
- npm: v8.19;
- MySQL: v8;
---

**INSTALAÇÃO**

1. Faça o clone do projeto e entre na pasta:

```bash
git clone git@github.com:Adolligit/store-manager.git

cd store-manager/
```
<details>
  <summary>Instalar com Docker 🐳</summary><br>

  2. Crie e inicie os contêiners:
  ```bash
  docker compose up -d
  ```
  3. Entre no contêiner da aplicação:
  ```bash
  docker exec -it store_manager bash
  ```
  ---
</details>

<details>
  <summary>Instalar localmente 💻</summary><br>

  2. Crie um arquivo **.env** na pasta raiz e declare as variáveis de ambiente:
   ```bash
   touch .env
   ```
   - Exemplo de arquivo **.env** (o nome de cada chave deve ser exatamente como esta declarado):
      ```bash
      MYSQL_HOST=localhost
      MYSQL_PORT=3306
      MYSQL_USER=nome_do_seu_usuário
      MYSQL_PASSWORD=sua_senha
      MYSQL_DATABASE=StoreManager
      APP_PORT=3000
      ```
  ---
</details>

3. Instale as dependências do projeto:
  ```bash
  npm install
  ```
4. Crie as tabelas do banco de dados:
```bash
npm run migration
```
5. Popule o banco de dados:
```bash
npm run seed
```
6. Inicie o projeto (escolha um dos comandos abaixo): 
  - Em modo de produção:
    ```bash
    npm start
    ```
  - Em modo de desenvolvimento (com *nodemon*):
    ```bash
    npm run debug 
    ```

## Quais são as rotas desta API?
Após ter instalado corretamente o Store Manager, agora é hora de você testar as rotas. Para isso, deixei uma documentação feita com **[Swagger UI](https://swagger.io/tools/swagger-ui/)** para facilitar e lhe orientar no uso da API.

Para acessar a documentação, basta navegar até a seguinte rota: 
> [http://localhost:3000/documentation](http://localhost:3000/documentation/)

<img align="center" alt="NodeJs" src="https://raw.githubusercontent.com/Adolligit/store-manager/main/img/1ss.png">

## Como eu posso executar os testes criados?

<p align="justify">
Considerando que você já fez todos os passos anteriores e o ambiente que você escolheu para executar o <b>Store Manager</b>, já está todo configurado, então, para você visualizar a cobertura de testes, basta executar o seguinte comando:
</p>

```bash
  npm run test:mocha
```

## Linguagens e ferramentas:
<div>
    <a href="https://swagger.io/tools/swagger-ui/"><img align="center" alt="NodeJs" height="45" width="45" src="https://camo.githubusercontent.com/96e43701d83561899724a89d71187445b7b8f4fe84518a3ea5bec8f85bd207bf/68747470733a2f2f63646e2e737667706f726e2e636f6d2f6c6f676f732f737761676765722e737667"></a>
    <a href="https://nodejs.org/en/"><img align="center" alt="NodeJs" height="45" width="45" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"></a>
    <a href="https://expressjs.com/pt-br/"><img align="center" alt="Express" height="45" width="45" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"></a>
    <a href="https://mochajs.org/"><img align="center" alt="Mocha" height="45" width="45" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mocha/mocha-plain.svg"></a>
    <a href="https://www.chaijs.com/"><img align="center" alt="Chai" height="45" width="45" src="https://cdn.icon-icons.com/icons2/2699/PNG/512/chaijs_logo_icon_168435.png"></a>
    <a href="https://sinonjs.org/"><img align="center" alt="Sinon" height="45" width="45" src="https://avatars.githubusercontent.com/u/6570253?s=280&v=4"></a>
    <a href="https://dev.mysql.com/doc/"><img align="center" alt="NodeJs" height="45" width="66" src="https://upload.wikimedia.org/wikipedia/labs/8/8e/Mysql_logo.png"></a>
    <a href="https://docs.docker.com/"><img align="center" alt="NodeJs" height="45" width="45" src="https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png"></a>
</div>

## Agradecimento
<p align="justify">
Com este projeto tive a oportunidade de trabalhar com camadas na construção da API Rest e utilizar a ténica de <b>TDD</b>, cobrindo parte do desenvolvimento com testes unitários.
</p>

<p align="justify">
E nada disso seria possível se não houvesse a idealização do projeto, portanto, agradeço a <a href="https://github.com/tryber">@tryber</a> pelo cuidado em trazer um projeto que nos desafia (nos alunos), a colocar em prática todos os nossos conhecimento em programação. 
</p>
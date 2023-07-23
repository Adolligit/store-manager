<h1 align="center">Store Manager</h1>

<p align="justify">
  Store Manager é uma API Rest que busca simular o gerenciamento de dados de uma loja.
</p>
<p align="justify">
  Esta API foi construída em <b>Node.js</b> junto ao <b>Express.js</b> sendo que sua cobertura de teste unitários foi realizada em <b>Mocha</b>, <b>Chai</b> e <b>Sinon</b>. Para consultar os dados no banco, foram feitas query's diretamente no código (<b>"hardcoded"</b>), sendo que elas e a estrutura do banco de dados, foram criados em MySQL.
</p>

## Como eu faço para executar este projeto?

Antes de mais nada, primeiro faça o clone e navegue até a pasta do projeto:

```bash
git clone git@github.com:Adolligit/store-manager.git && cd store-manager/
```

### Instalação

<p align="justify">
🚨 É <b>crucial</b> que você já tenha em sua máquina as ferramentas citadas em cada tipo de instalação, com a correta versão ou superior.

Escolha uma das instalações a seguir:
</p>
<details>
  <summary>Instalar com Docker 🐳</summary>
  <b>Requisitos</b>
  <br>Você deve possuir as seguintes ferramentas:
<ul>
    <li>Docker: v20.1</li>
    <li>Docker Compose: v1.29</li>
</ul>

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
  <summary>Instalar localmente 💻</summary>
  <b>Requisitos</b>
  <br>Você deve possuir as seguintes ferramentas:
<ul>
    <li>Node.js: v16</li>
    <li>npm: v8.19</li>
    <li>MySQL: v8</li>
</ul>

  1. Crie um arquivo **.env** na pasta raiz e declare as variáveis de ambiente:
   ```bash
   touch .env
   ```
   2. Abra o arquivo **.env** e então copie e cole as informações a seguir:
      ```bash
      # db
      MYSQL_HOST=127.0.0.1
      MYSQL_PORT=3306
      MYSQL_USER=
      MYSQL_PASSWORD=
      MYSQL_DATABASE=StoreManager

      # app
      APP_PORT=3000
      ```
  3. No arquivo **.env**, informe seus dados de acesso ao banco de dados MySQL nas chaves: **MYSQL_USER** e **MYSQL_PASSWORD** (lembre-se de salvar o arquivo).
  ---
</details>

### Execução

Instalar as dependências do projeto:
  ```bash
npm install
  ```
Criar as tabelas no banco de dados MySQL:
```bash
npm run migration
```
Popular o banco de dados:
```bash
npm run seed
```
Iniciar o projeto:
```bash
npm start
```
Inciar o projeto em modo de desenvolvimento (nodemon):
```bash
npm run debug
```
Executar os a cobertura de testes:
```bash
npm run test:mocha
```
## Quais são as rotas desta API?
Deixei uma documentação feita com [Swagger UI](https://swagger.io/tools/swagger-ui/) para facilitar e lhe orientar no uso da API. Você pode acessa-la em [http://127.0.0.1:3000/docs](http://127.0.0.1:3000/docs/).
<img align="center" alt="NodeJs" src="https://raw.githubusercontent.com/Adolligit/store-manager/main/img/1ss.png">

## Erros comuns
Descrevo neste tópico alguns possíveis erros que você pode esta enfrentando durante a instalação ou execução desta API.



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
Com este projeto tive a oportunidade de trabalhar com camadas na construção da API Rest e utilizar a técnica de <b>TDD</b>, cobrindo parte do desenvolvimento com testes unitários.
</p>

<p align="justify">
E nada disso seria possível se não houvesse a idealização do projeto, portanto, agradeço a <a href="https://github.com/tryber">@tryber</a> pelo cuidado em trazer um projeto que nos desafia (nos alunos), a colocar em prática todos os nossos conhecimento em programação. 
</p>
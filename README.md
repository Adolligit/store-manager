<style>
  h1 { text-align: center; }

  p { text-align: justify; }

  #crucial[open] > summary {
      list-style-type: '⚠️';
      font-weight: 900;
  }
  
</style>

<h1>Store Manager</h1>

<p>
  Store Manager é uma API Rest que busca simular o gerenciamento de dados de uma loja.
</p>
<p>
  Esta API foi construída em <b>Node.js</b> junto ao <b>Express.js</b> sendo que sua cobertura de teste unitários foi realizada em <b>Mocha</b>, <b>Chai</b> e <b>Sinon</b>. Para consultar os dados no banco, foram feitas query's diretamente no código (<b>"hardcoded"</b>), sendo que elas e a estrutura do banco de dados, foram criados em MySQL.
</p>

## Como eu faço para executar este projeto?

**⚠️ ATENÇÃO ⚠️**
É crucial que você já tenha em sua máquina as seguintes ferramentas, com a versão especificada, ou superior:

- Node.js: v16;
- Docker: v20.10;
- docker-compose: v1.29;
- npm: v8.19;
- MySQL: v8;
---

Faça o clone do projeto e entre na pasta:

```bash
git clone git@github.com:Adolligit/store-manager.git

cd store-manager/
```
com docker:
1. docker-compose up -d
2. docker exec -it store_manager bash

sem docker:
1. touch .env:
	- mostrar um exemplo
	MYSQL_HOST=localhost
	MYSQL_PORT=3306
	MYSQL_USER=nome_do_seu_usuário
	MYSQL_PASSWORD=sua_senha
	MYSQL_DATABASE=StoreManager
	APP_PORT=3000
2. npm install


3. npm run migration
4. npm run seed
5. npm start (em produção) | npm run debug (em desenvolvimento)


## Linguagens e ferramentas:
<div>
    <a href="https://nodejs.org/en/"><img align="center" alt="NodeJs" height="45" width="45" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"></a>
    <a href="https://expressjs.com/pt-br/"><img align="center" alt="Express" height="45" width="45" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"></a>
    <a href="https://mochajs.org/"><img align="center" alt="Mocha" height="45" width="45" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mocha/mocha-plain.svg"></a>
    <a href="https://www.chaijs.com/"><img align="center" alt="Chai" height="45" width="45" src="https://cdn.icon-icons.com/icons2/2699/PNG/512/chaijs_logo_icon_168435.png"></a>
    <a href="https://sinonjs.org/"><img align="center" alt="Sinon" height="45" width="45" src="https://avatars.githubusercontent.com/u/6570253?s=280&v=4"></a>
    <a href="https://dev.mysql.com/doc/"><img align="center" alt="NodeJs" height="45" width="66" src="https://upload.wikimedia.org/wikipedia/labs/8/8e/Mysql_logo.png"></a>
    <a href="https://docs.docker.com/"><img align="center" alt="NodeJs" height="45" width="45" src="https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png"></a>
</div>
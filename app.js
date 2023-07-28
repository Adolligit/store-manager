const express = require('express');
const cors = require('cors');

const routes = require('./route');
const middleware = require('./middleware');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});


app.use(cors())
app.use(express.json());
app.use(routes)
app.use(middleware.handlerError.controller)

module.exports = app;
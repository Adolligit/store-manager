const express = require('express');
const cors = require('cors');

const routes = require('./route');
const ControllerErrorHandler = require('./middleware/error/controller-error-handler');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});


app.use(cors())
app.use(express.json());
app.use(routes)

app.use(ControllerErrorHandler);

module.exports = app;
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./public/swagger.json');

const routes = require('./route');
const ControllerErrorHandler = require('./middleware/error/controller-error-handler');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors())
app.use(express.json());
app.use(routes)

app.use(ControllerErrorHandler);

module.exports = app;
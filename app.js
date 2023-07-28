const app = require('express').Router();
const routes = require('./route');
const middleware = require('./middleware');

app.use('/v1', routes);
app.use(middleware.handlerError.controller);

module.exports = app;
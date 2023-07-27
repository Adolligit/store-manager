const express = require('express');
const app = require('./app');
require('dotenv').config();

const PORT = process.env.APP_PORT;

const index = express();

index.use('/v1', app)
index.listen(PORT || 3000, () => {
  console.log(`Escutando na porta ${PORT}`);
});

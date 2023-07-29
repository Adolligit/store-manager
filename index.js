require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = require('./app');

const index = express();
const PORT = process.env.APP_PORT || 3000;

index.use(cors());
index.use(express.json());
index.use(app);
index.listen(PORT, () => console.log(`${PORT}^`));

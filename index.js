const app = require('./app');
require('dotenv').config();

const PORT = process.env.APP_PORT;

app.listen(PORT || 3000, () => {
  console.log(`Escutando na porta ${PORT}`);
});

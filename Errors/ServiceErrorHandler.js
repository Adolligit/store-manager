const boom = require('@hapi/boom');

module.exports = (code, message) => {
  const { output: { payload } } = boom[code](message);

  return payload;
};
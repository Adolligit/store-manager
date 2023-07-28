const rescue = require('express-rescue');

module.exports = (any) => (
  (typeof any === 'function')
    ? rescue(any)
    : any.map((e) => rescue(e))
);

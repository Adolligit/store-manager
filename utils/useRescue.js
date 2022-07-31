const rescue = require('express-rescue');

module.exports = (arr) => arr.map((e) => rescue(e));
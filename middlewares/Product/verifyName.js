const Joi = require('joi');

module.exports = (req, _res, next) => {
  let schema = Joi.object({ name: Joi.string().required() });
  let valid = schema.validate(req.body);
  
  if (valid.error) throw new Error(valid.error.message, { cause: { status: 400 } });

  schema = Joi.object({ name: Joi.string().min(5) });
  valid = schema.validate(req.body);

  if (valid.error) throw new Error(valid.error.message, { cause: { status: 422 } });

  next();
};

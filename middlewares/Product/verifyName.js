const Joi = require('joi');

module.exports = (req, _res, next) => {
  const schema = Joi.object({ name: Joi.string().required() });
  const { error } = schema.validate(req.body);
  
  if (error) throw new Error(error.message, { cause: { status: 400 } });

  next();
};

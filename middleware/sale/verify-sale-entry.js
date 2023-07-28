const Joi = require('joi');

module.exports = (req, _res, next) => {
  let schema = Joi.object({
    productId: Joi.number().integer().required(),
    quantity: Joi.number().integer().required(),
  });

  req.body.forEach((e) => {
    const { error } = schema.validate(e);

    if (error) {
      throw new Error(error.message, { cause: { status: 400 } });
    }
  });

  schema = Joi.object({ productId: Joi.required(), quantity: Joi.number().min(1) });

  req.body.forEach((sale) => {
    const { error } = schema.validate(sale);

    if (error) throw new Error(error.message, { cause: { status: 422 } });
  });
    
  next();
};
const Joi = require('joi');

module.exports = (req, _res, next) => {
  const schema = Joi.object({
    productId: Joi.number().required(),
    quantity: Joi.number().required(),
  });

  req.body.forEach((e) => {
    const { error } = schema.validate(e);

    if (error) {
      throw new Error(error.message, { cause: { status: 400 } });
    }
  });
    
  next();
};
const Joi = require('joi');

const customerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  location: Joi.object({
    street: Joi.string().required(),
    streetNo: Joi.string().required(),
    zipCode: Joi.string().required(),
    city: Joi.string().required(),
  })
});

module.exports = customerSchema;

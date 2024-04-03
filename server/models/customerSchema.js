const Joi = require('joi');

const customerSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
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

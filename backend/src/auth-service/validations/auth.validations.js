const Joi = require('joi');

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const registerValidation = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  roleId: Joi.number().integer().required(),
});

const refreshTokenValidation = Joi.object({
  refreshToken: Joi.string().required(),
});

module.exports = {
  loginValidation,
  registerValidation,
  refreshTokenValidation,
};
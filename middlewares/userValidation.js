const { celebrate, Joi } = require('celebrate');
const {
  REQUIRED_ERROR,
  MIN_LENGTH_ERROR,
  MAX_LENGTH_ERROR,
} = require('../utils/constants');

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  })
    .messages({
      'any.required': REQUIRED_ERROR,
      'string.min': MIN_LENGTH_ERROR,
      'string.max': MAX_LENGTH_ERROR,
    }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  })
    .messages({
      'any.required': REQUIRED_ERROR,
      'string.min': MIN_LENGTH_ERROR,
    }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  })
    .messages({
      'string.min': MIN_LENGTH_ERROR,
      'string.max': MAX_LENGTH_ERROR,
    }),
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validateUpdateUser,
};

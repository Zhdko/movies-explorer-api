const { celebrate, Joi } = require('celebrate');
const {
  urlRegExp,
  ruLengRegExp,
  enLengRegExp,
  BAD_URL,
  WRONG_LENG_ERROR,
  REQUIRED_ERROR,
} = require('../utils/constants');

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlRegExp).message(BAD_URL),
    trailerLink: Joi.string().required().pattern(urlRegExp).message(BAD_URL),
    thumbnail: Joi.string().required().pattern(urlRegExp).message(BAD_URL),
    movieId: Joi.number().required(),
    nameRu: Joi.string().required().pattern(ruLengRegExp).message(`${WRONG_LENG_ERROR} кирилицы`),
    nameEn: Joi.string().required().pattern(enLengRegExp).message(`${WRONG_LENG_ERROR} латиницы`),
  })
    .messages({
      'any.required': REQUIRED_ERROR,
    }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().required().length(24),
  })
    .messages({
      'any.required': REQUIRED_ERROR,
    }),
});

module.exports = { validateCreateMovie, validateMovieId };

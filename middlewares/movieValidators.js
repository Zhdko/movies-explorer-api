const { celebrate, Joi } = require('celebrate');
const { urlRegExp, ruLengRegExp, enLengRegExp } = require('../utils/constants');

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlRegExp),
    trailerLink: Joi.string().required().pattern(urlRegExp),
    thumbnail: Joi.string().required().pattern(urlRegExp),
    movieId: Joi.number().required(),
    nameRu: Joi.string().required().pattern(ruLengRegExp),
    nameEn: Joi.string().required().pattern(enLengRegExp),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().required().length(24),
  }),
});

module.exports = { validateCreateMovie, validateMovieId };

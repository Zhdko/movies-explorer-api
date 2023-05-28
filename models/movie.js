const mongoose = require('mongoose');
const {
  urlRegExp,
  ruLengRegExp,
  enLengRegExp,
  WRONG_LENG_ERROR,
  BAD_URL,
} = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator: (image) => urlRegExp.test(image),
      message: BAD_URL,
    },
    required: true,
  },
  trailerLink: {
    type: String,
    validate: {
      validator: (trailerLink) => urlRegExp.test(trailerLink),
      message: BAD_URL,
    },
    required: true,
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (trailerLink) => urlRegExp.test(trailerLink),
      message: BAD_URL,
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRu: {
    type: String,
    required: true,
    validate: {
      validator: (nameRu) => ruLengRegExp.test(nameRu),
      message: `${WRONG_LENG_ERROR} кирилицы`,
    },
  },
  nameEn: {
    type: String,
    required: true,
    validate: {
      validator: (nameEn) => enLengRegExp.test(nameEn),
      message: `${WRONG_LENG_ERROR} латиницы`,
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);

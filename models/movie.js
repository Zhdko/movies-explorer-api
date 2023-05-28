const mongoose = require('mongoose');
const { urlRegExp, ruLengRegExp, enLengRegExp } = require('../utils/constants');

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
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (image) => urlRegExp.test(image),
      message: 'Некорректный URL',
    },
    required: true,
  },
  trailerLink: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (trailerLink) => urlRegExp.test(trailerLink),
      message: 'Некорректный URL',
    },
    required: true,
  },
  thumbnail: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (trailerLink) => urlRegExp.test(trailerLink),
      message: 'Некорректный URL',
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
      message: 'Название может содердать только буквы в кириллице',
    },
  },
  nameEn: {
    type: String,
    required: true,
    validate: {
      validator: (nameEn) => enLengRegExp.test(nameEn),
      message: 'Название может содердать только буквы в кириллице',
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);

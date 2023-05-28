const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { v4: uuidv4 } = require('uuid');
const AuthorizationError = require('../Errors/AuthorizationError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Почта некорректна',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: () => uuidv4().substring(0, 8),
    unique: true,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthorizationError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new AuthorizationError('Неправильные почта или пароль'));
        }

        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);

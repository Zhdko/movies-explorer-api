require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../Errors/NotFoundError');
const User = require('../models/user');
const RegisterError = require('../Errors/RegisterError');
const RequestError = require('../Errors/RequestError');
const { secretKey } = require('../utils/constants');

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      email,
      name,
      password: hash,
    })
      .then((user) => {
        const userObject = user.toObject();
        delete userObject.password;
        res.status(201).send(userObject);
      })
      .catch((err) => {
        if (err.code === 11000) {
          next(new RegisterError('Email уже используется'));
        } else if (err instanceof mongoose.Error.ValidationError) {
          next(new RequestError('Переданы неккоректные данные'));
        } else {
          next(err);
        }
      });
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user.id }, secretKey, { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          sameSite: 'none',
          httpOnly: true,
          secure: true,
        })
        .send({ token });
    })
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).send({ message: 'Вы успешно вышли' });
  res.end();
};

const findUser = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .orFail(() => next(new NotFoundError('Пользователь по указанному id не найден')))
    .then((user) => res.send(user))
    .catch(next);
};

const findAndUpdate = (req, data, res, next) => {
  const id = req.user._id;
  User.findByIdAndUpdate(id, data, { new: true, runValidators: true })
    .orFail(() => next(new NotFoundError('Пользователь по указанному id не найден')))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports = {
  findUser,
  findAndUpdate,
  createUser,
  login,
  logout,
};

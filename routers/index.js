const routers = require('express').Router();
const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { movieRouter } = require('./movies');
const { userRouter } = require('./users');
const auth = require('../middlewares/auth');
const { login, createUser, logout } = require('../controllers/users');
const { validateLogin, validateCreateUser } = require('../middlewares/userValidation');

const { limiter } = require('../middlewares/rateLimit');
const NotFoundError = require('../Errors/NotFoundError');

routers.use(helmet());
routers.use(express.json());
routers.use(express.urlencoded({ extended: true }));
routers.use(cookieParser());

routers.use(limiter);

routers.post('/signup', validateCreateUser, createUser);
routers.post('/signin', validateLogin, login);
routers.post('/signout', logout);

routers.use('/movies', auth, movieRouter);
routers.use('/users', auth, userRouter);

routers.use((req, res, next) => {
  next(new NotFoundError('Такого URL не существует'));
});

module.exports = { routers };

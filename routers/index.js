const routers = require('express').Router();
const express = require('express');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { movieRouter } = require('./movies');
const { userRouter } = require('./users');
const auth = require('../middlewares/auth');
const { login, createUser, logout } = require('../controllers/users');
const { validateLogin, validateCreateUser } = require('../middlewares/userValidation');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const NotFoundError = require('../Errors/NotFoundError');

const limiter = rateLimit({
  windowsMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

routers.use(helmet());
routers.use(express.json());
routers.use(express.urlencoded({ extended: true }));
routers.use(bodyParser.json());
routers.use(cookieParser());
routers.use(requestLogger);

routers.use(limiter);

routers.post('/signup', validateCreateUser, createUser);
routers.post('/signin', validateLogin, login);
routers.post('/signout', logout);

routers.use('/movies', auth, movieRouter);
routers.use('/users', auth, userRouter);

routers.use(errorLogger);
routers.use((req, res, next) => {
  next(new NotFoundError('Такого URL не существует'));
});
routers.use(errors());
routers.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

module.exports = { routers };

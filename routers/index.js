const routers = require('express').Router();
const { movieRouter } = require('./movies');
const { userRouter } = require('./users');
const auth = require('../middlewares/auth');
const { login, createUser, logout } = require('../controllers/users');
const { validateLogin, validateCreateUser } = require('../middlewares/userValidation');

const NotFoundError = require('../Errors/NotFoundError');

routers.post('/signup', validateCreateUser, createUser);
routers.post('/signin', validateLogin, login);
routers.post('/signout', logout);

routers.use('/movies', auth, movieRouter);
routers.use('/users', auth, userRouter);

routers.use((req, res, next) => {
  next(new NotFoundError('Такого URL не существует'));
});

module.exports = { routers };

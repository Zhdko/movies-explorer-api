const jwt = require('jsonwebtoken');
const AuthorizationError = require('../Errors/AuthorizationError');
const { secretKey, NOT_AUTHORIZATION } = require('../utils/constants');
require('dotenv').config();

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new AuthorizationError(NOT_AUTHORIZATION));
  }

  let payload;
  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    return next(new AuthorizationError(NOT_AUTHORIZATION));
  }

  req.user = payload;

  return next();
};

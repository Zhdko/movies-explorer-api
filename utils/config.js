require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const SECRET_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
const MONGO_DB = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const PORT = 3000;
const ALLOWED_CORS = [
  'https://zhdko.movies.nomoredomains.rocks',
  'http://zhdko.movies.nomoredomains.rocks',
  'http://localhost:3001',
];

const CORS_OPTIONS = {
  credentials: true,
  origin: ALLOWED_CORS,
  exposedHeaders: ['set-cookie'],
};

module.exports = {
  SECRET_KEY,
  MONGO_DB,
  PORT,
  CORS_OPTIONS,
};
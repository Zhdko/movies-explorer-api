const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { limiter } = require('./middlewares/rateLimit');

const app = express();
const { routers } = require('./routers');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorsHandler } = require('./middlewares/errorsHandler');

const { PORT = 3000, DB = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

mongoose.connect(DB, { useNewUrlParser: true });
app.use(
  cors({
    credentials: true,
    origin: [
      'https://zhdko.movies.nomoredomains.rocks',
      'http://zhdko.movies.nomoredomains.rocks',
      'http://localhost:3001',
    ],
    exposedHeaders: ['set-cookie'],
  }),
);

app.listen(PORT);

app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

app.use(requestLogger);

app.use(routers);

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

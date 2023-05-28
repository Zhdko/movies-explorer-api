const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');

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
      'https://mesto.zhdko.nomoredomains.monster',
      'http://mesto.zhdko.nomoredomains.monster',
    ],
    exposedHeaders: ['set-cookie'],
  }),
);

app.listen(PORT);

routers.use(requestLogger);

app.use(routers);

routers.use(errorLogger);
routers.use(errors());
routers.use(errorsHandler);

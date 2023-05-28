const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const mongoose = require('mongoose');
const { routers } = require('./routers');

const { PORT = 3000, DB = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

mongoose.connect(DB, { useNewUrlParser: true }).catch((err) => console.log(err));

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

app.use(routers);

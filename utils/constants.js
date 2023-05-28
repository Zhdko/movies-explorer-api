const { NODE_ENV, JWT_SECRET } = process.env;
require('dotenv').config();

const urlRegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/;
const ruLengRegExp = /^[А-Яа-яёЁ\s]+$/;
const enLengRegExp = /^[A-Za-z\s]/;
const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

module.exports = {
  urlRegExp,
  secretKey,
  ruLengRegExp,
  enLengRegExp,
};

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const NotFoundError = require('./errors/not-found-errors');
const { handleError } = require('./utils/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cookieParser());

app.use(bodyParser.json());

// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1/mestodb', {
  useNewUrlParser: true,
});

app.use(requestLogger); // подключаем логгер запросов

app.use(cors());

app.use(routerUsers, function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
);

app.use(routerCards, function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
);

app.all('/*', () => {
  throw new NotFoundError('Requested path not found');
});

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80');
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.use(handleError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

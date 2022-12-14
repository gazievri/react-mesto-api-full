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
const { corsOptions } = require('./utils/corsOptions');

require('dotenv').config();

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(bodyParser.json());

// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1/mestodb', {
  useNewUrlParser: true,
});

app.use(requestLogger); // подключаем логгер запросов

app.use(routerUsers);

app.use(routerCards);

app.all('/*', () => {
  throw new NotFoundError('Requested path not found');
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.use(handleError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

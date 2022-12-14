const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorized-errors');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.authorization;

  if (!token) {
    throw new UnauthorizedError('Authorization is needed');
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new UnauthorizedError('Authorization is needed');
  }

  req.user = payload;
  next();
};

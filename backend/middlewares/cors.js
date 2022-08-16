// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = {
  origin: [
    'http://gazievri.mesto.nomoredomains.sbs/',
    'https://gazievri.mesto.nomoredomains.sbs/',
    'localhost:3000',
  ],
};

const cors = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  next();
};

module.exports = {
  cors,
  allowedCors,
};

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const morgan = require('morgan');
const routes = require('./routes/index.js');

require('./db.js');

const server = express();

server.name = 'API';
server.use(cors())
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' })); // Para recibir bien el body. Sin esto llegaría undefined o un objeto vacío.
server.use(cookieParser()); // Para tener acceso a las cookies.
server.use(morgan('dev')); // Middleware que sirve para ir mostrando en consola las peticiones que vamos haciendo al servidor.


server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;

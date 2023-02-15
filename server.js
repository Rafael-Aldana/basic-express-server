'use strict';

// *** Bring in our dependencies ***
const express = require('express');
const PORT = process.env.PORT || 3002;
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const logger = require('./middleware/logger.js');
const validator = require('./middleware/validator.js');

// **** express singleton instance ****
const app = express();

// *** middleware ***
app.use(express.json());
app.use(logger);

// *** proof of life ***
app.get('/', (req, res) => {
  const  message = 'Welcome to my API';
  res.status(200).send(message);
});

// *** person routes ***
app.get('/person', validator, (req, res) => {
  // if (!req.query.name) {
  //   next();
  //   return;
  // }

  const name = { name: req.query.name };

res.status(200).json(name);
});

// *** this function will be called when the server is started ***
function startServer(){
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}

// *** error handlers ***
app.use('*', notFound);
app.use(errorHandler);

module.exports = { startServer, app };

'use strict';

const validator = (req, res, next) => {
  if (!req.query.name) {
    throw new Error('Name is required');

  } else {
    next();
  }
};

module.exports = validator;

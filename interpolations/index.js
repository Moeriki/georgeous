'use strict';

const level = require('./level');
const message = require('./message');
const metadata = require('./metadata');
const separator = require('./separator');
const time = require('./time');

module.exports = {
  level,
  message,
  separator,
  time,
  // metadata last because it depends on others.
  // I know you shouldn't depend on JSON key order but it does work
  // consistently in all Node version so sue me.
  metadata,
};

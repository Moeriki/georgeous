'use strict';

const georgeous = require('georgeous/winston');
const winston = require('winston');

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      formatter: georgeous(),
      level: 'silly',
    }),
  ],
});

logger.silly('starting');

logger.debug('hello world!');

logger.verbose('how are you!');

logger.info('successfully logged in', { user: 'moeriki' });

logger.warn('could not get asset by ID', { id: 123 });

logger.error('failure to communicate', new Error('NOPE'));

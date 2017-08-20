'use strict';

const bunyan = require('bunyan');

const log = bunyan.createLogger({ name: 'bunyan-example' });

log.info({ user: 'moeriki' }, 'successfully logged in');

log.warn({ id: 123 }, 'could not get asset by ID');

log.error(new Error('NOPE'));

log.fatal('catastrophic failure');

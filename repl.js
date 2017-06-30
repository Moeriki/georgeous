'use strict';

const log = require('./');

log('Hello World!');
log({ level: 'info', msg: 'Hello World!' });

log.info('successfully logged in', { user: 'moeriki' });

log.warn('could not get asset by ID', { id: 123 });

log.error('failure', new Error('NOPE'));

log.fatal('catastrophic failure');

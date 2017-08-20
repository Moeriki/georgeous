'use strict';

const log = require('georgeous');

log.trace('starting');

log('Hello World!');

log.debug('how are you?');

log({ level: 'info', msg: 'Hello World!' });

log.info({ user: 'moeriki' }, 'successfully logged in');

log.warn('could not get asset by ID', { id: 123 });

log.error(new Error('NOPE'), 'failure to communicate');

log.fatal('catastrophic failure');

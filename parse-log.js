'use strict';

const merge = require('lodash.merge');

// exports

function parseLog(args, options) {
  const log = {};
  args.forEach((arg) => {
    if (typeof arg === 'string') {
      log[options.message.key] = arg;
    } else if (arg instanceof Error) {
      log[options.message.key] = log[options.message.key] || arg.message;
      log.err = {
        name: arg.name,
        stack: arg.stack,
      };
    } else {
      merge(log, arg);
    }
  });
  return log;
}

module.exports = parseLog;

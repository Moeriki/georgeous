'use strict';

const georgeous = require('./georgeous');

// exports

function formatterFactory(options = {}) {

  options.preset = 'winston';

  const logger = georgeous(options);

  /**
   * @param {object}   log
   * @param {string}   log.level
   * @param {string}   [log.message]
   * @param {object}   [log.meta]
   * @return {string}
   */
  return ({ level, message, meta }) => {
    const log = { level, msg: message };
    Object.assign(log, meta);
    if (log.stack) {
      log.msg = log.msg || log.message;
      log.err = { stack: log.stack };
      delete log.message;
      delete log.stack;
    }
    return logger(log);
  };
}

module.exports = formatterFactory;

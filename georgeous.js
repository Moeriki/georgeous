'use strict';

const parseLog = require('./parse-log');
const parseOptions = require('./parse-options');

const interpolations = require('./interpolations');

// exports

function georgeous(arg0) {
  const options = parseOptions(arg0);

  // exposed

  function write(...args) {
    const log = parseLog(args, options);
    const data = { src: log };
    Object.keys(interpolations).forEach((key) => {
      const { format } = interpolations[key];
      Object.defineProperty(data, key, {
        get() {
          return format(log, options[key], options);
        },
      });
    });
    const format = options.template(data);
    if (!options.write) {
      return format;
    }
    process.stdout.write(`${format}\n`);
  }

  options.levels.forEach(({ id, name }) => {
    const level = typeof id !== 'undefined' ? id : name;
    Object.assign(write, {
      [name](...args) {
        write(...args, { level });
      },
    });
  });

  return write;
}

module.exports = georgeous;

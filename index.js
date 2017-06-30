'use strict';

const path = require('path');

const chalk = require('chalk');

// constants

const CWD = process.cwd();

const LEVEL_COLORS = {
  trace: chalk.gray,
  debug: chalk.gray,
  info: chalk.cyan,
  warn: chalk.yellow.bold,
  error: chalk.red.bold,
  fatal: (msg) => chalk.bgRed.white.bold(msg),
};

const METADATA = ['level', 'msg', 'time'];

// private

const cleanStacktrace = (stacktrace) => stacktrace
  .split('\n')
  .filter((line) => !line.match('/jest-jasmine/'))
  .map((line, index) => {
    let newLine = line;
    if (index === 0) {
      return chalk.red.bold(newLine);
    }
    const pathMatch = line.match(/(\/[^:]+):\d+:\d+/);
    if (!pathMatch) {
      // dim non-path lines
      return chalk.gray(newLine);
    }
    const [, filepath] = pathMatch;
    // rewrite filepaths to be relative to CWD
    if (filepath.indexOf(CWD) !== -1) {
      // highlight filepaths directly in CWD
      newLine = newLine
        .replace(filepath, `./${chalk.magenta(path.relative(CWD, filepath))}`)
        .replace(/(at )([^ ]+)/, `$1${chalk.blue('$2')}`)
      ;
    } else {
      newLine = newLine.replace(filepath, path.relative(CWD, filepath));
      // dim node modules
      if (newLine.indexOf('/node_modules/') !== -1) {
        newLine = chalk.gray(newLine);
      }
    }
    return newLine;
  })
  .join('\n')
;

// exports

function log(msg, ...metadatum) {
  const logData = {};
  if (typeof msg === 'string') {
    logData.msg = msg;
  } else if (typeof msg === 'object') {
    Object.assign(logData, msg);
  }

  metadatum.forEach((metadata) => {
    if (metadata instanceof Error) {
      Object.assign(logData, {
        err: {
          message: metadata.message,
          stack: metadata.stack,
        },
      });
    } else {
      Object.assign(logData, metadata);
    }
  });

  const colorizeWithLevel = LEVEL_COLORS[logData.level] || chalk.white;

  const formatMetadata = (key, { parent = logData, parentKeys = [] } = {}) => {
    let metadata = parent[key];
    if (metadata != null && typeof metadata === 'object') {
      return Object.keys(metadata)
        .map((metaKey) => formatMetadata(metaKey, {
          parent: metadata,
          parentKeys: parentKeys.concat(key),
        }))
        .join(' ')
      ;
    }
    const fullKey = parentKeys.concat(key).join('.');
    if (fullKey === 'err.stack') {
      metadata = cleanStacktrace(metadata);
    }
    return `${chalk.gray(`${fullKey}=`)}${metadata}`;
  };

  // format date time
  const time = chalk.gray(
    new Date(logData.time || Date.now()).toLocaleTimeString('nl-BE', { hour12: false })
  );

  // format message
  const message = colorizeWithLevel(logData.msg);

  // format metadata
  const metadata = Object.keys(logData)
    .filter((key) => !METADATA.includes(key))
    .map(formatMetadata)
    .join(' ')
  ;

  // write log line
  process.stdout.write(`${time} ${message || ''}`);
  if (metadata) {
    process.stdout.write(` ${chalk.blue('·')} ${metadata}`);
  }
  process.stdout.write('\n');
}

Object.keys(LEVEL_COLORS).forEach((level) => {
  Object.assign(log, {
    [level](...args) {
      log(...args, { level });
    },
  });
});

module.exports = log;

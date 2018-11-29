'use strict';

const path = require('path');
const process = require('process');

const chalk = require('chalk');
const traverse = require('traverse');

// private

const cleanStacktrace = (stacktrace, { cwd }) =>
  stacktrace
    .split('\n')
    .filter(line => !line.match('/jest-jasmine/'))
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
      if (filepath.indexOf(cwd) !== -1) {
        // highlight filepaths directly in CWD
        newLine = newLine
          .replace(filepath, `./${chalk.magenta(path.relative(cwd, filepath))}`)
          .replace(/(at )([^ ]+)/, `$1${chalk.blue('$2')}`);
      } else {
        newLine = newLine.replace(filepath, path.relative(cwd, filepath));
        // dim node modules
        if (newLine.indexOf('/node_modules/') !== -1) {
          newLine = chalk.gray(newLine);
        }
      }
      return newLine;
    })
    .join('\n');
// exports

const defaults = (
  { cwd = process.cwd(), exclude = [] } = {},
  { level, message, time }
) => {
  exclude.push(level.key, message.key, time.key);
  return { cwd, exclude };
};

const format = (log, { cwd, exclude }) =>
  traverse(log)
    .reduce(function reduceLeafs(acc, value) {
      /* eslint-disable no-invalid-this */
      if (this.isLeaf) {
        acc.push({ key: this.path.join('.'), value });
      }
      return acc;
    }, [])
    .filter(({ key }) => !exclude.includes(key))
    .map(({ key, value }) => {
      let transformedValue;
      if (key === 'err.stack') {
        transformedValue = cleanStacktrace(value, { cwd });
      } else if (typeof value === 'object') {
        transformedValue = JSON.stringify(value);
      }
      return `${chalk.gray(`${key}=`)}${transformedValue || value}`;
    })
    .join(' ');

module.exports = { defaults, format };

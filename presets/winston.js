'use strict';

const chalk = require('chalk');

module.exports = {
  levels: [
    {
      id: 'error',
      name: 'error',
      modifier: chalk.red.bold,
    },
    {
      id: 'warn',
      name: 'warn',
      modifier: chalk.yellow.bold,
    },
    {
      id: 'info',
      name: 'info',
      modifier: chalk.cyan,
    },
    {
      id: 'verbose',
      name: 'verbose',
      modifier: chalk.white,
    },
    {
      id: 'debug',
      name: 'debug',
      modifier: chalk.gray,
    },
    {
      id: 'silly',
      name: 'silly',
      modifier: chalk.gray.dim,
    },
  ],
  write: false,
};

'use strict';

const chalk = require('chalk');

module.exports = {
  levels: [
    {
      id: 20,
      name: 'debug',
      modifier: chalk.gray,
    },
    {
      id: 30,
      name: 'info',
      modifier: chalk.cyan,
    },
    {
      id: 40,
      name: 'warn',
      modifier: chalk.yellow.bold,
    },
    {
      id: 50,
      name: 'error',
      modifier: chalk.red.bold,
    },
    {
      id: 60,
      name: 'fatal',
      modifier: (msg) => chalk.bgRed.white.bold(msg),
    },
  ],
  metadata: {
    exclude: ['name', 'hostname', 'pid', 'v'],
  },
};

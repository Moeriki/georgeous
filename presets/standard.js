'use strict';

const chalk = require('chalk');

module.exports = {
  levels: [
    { id: 'trace', name: 'trace', modifier: chalk.gray.dim },
    { id: 'debug', name: 'debug', modifier: chalk.gray },
    { id: 'info', name: 'info', modifier: chalk.cyan },
    { id: 'warn', name: 'warn', modifier: chalk.yellow.bold },
    { id: 'error', name: 'error', modifier: chalk.red.bold },
    { id: 'fatal', name: 'fatal', modifier: chalk.bgRed.white.bold },
  ],
};

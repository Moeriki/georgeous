'use strict';

const chalk = require('chalk');

// exports

const defaults = ({ char = '·', modifier = chalk.blue }) => ({
  char,
  modifier,
});

const format = (log, { char, modifier }) => modifier(char);

module.exports = { defaults, format };

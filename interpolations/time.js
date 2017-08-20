'use strict';

const chalk = require('chalk');
const osLocale = require('os-locale');

// exports

const defaults = ({
  hour12 = false,
  key = 'time',
  locale = osLocale.sync().replace('_', '-'),
  modifier = chalk.gray,
} = {}) => ({ hour12, key, locale, modifier });

function format(log, { hour12, key, locale, modifier }) {
  const time = new Date(log[key] || Date.now());
  return modifier(time.toLocaleTimeString(locale, { hour12 }));
}

module.exports = { defaults, format };

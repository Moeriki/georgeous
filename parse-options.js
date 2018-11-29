'use strict';

const merge = require('lodash.merge');
const template = require('lodash.template');

const presets = require('./presets');
const interpolations = require('./interpolations');

// constants

const DEFAULT_PRESET = 'standard';

const DEFAULT_TEMPLATE = '{time} {message} {separator} {metadata}';

const INTERPOLATE = /{([\s\S]+?)}/g;

// exports

function parseOptions(arg0 = {}) {
  const options = merge(
    { write: true },
    presets[arg0.preset || DEFAULT_PRESET],
    arg0
  );

  options.template = template(options.template || DEFAULT_TEMPLATE, {
    interpolate: INTERPOLATE,
  });

  Object.keys(interpolations).forEach(key => {
    const { defaults } = interpolations[key];
    options[key] = defaults ? defaults(options[key] || {}, options) : {};
  });

  return options;
}

module.exports = parseOptions;

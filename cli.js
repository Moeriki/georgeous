#!/usr/bin/env node

'use strict';

const split = require('split');
const yargs = require('yargs');

const georgeous = require('./georgeous');

const { argv } = yargs
  .option('preset', {
    alias: 'p',
  })
  .help()
;

const log = georgeous({
  preset: argv.preset,
});

process.stdin
  .pipe(split())
  .on('data', (data) => {
    if (data) {
      try {
        log(JSON.parse(data));
      } catch (err) {
        if (err.name !== 'SyntaxError') {
          throw err;
        }
        process.stdout.write(`${data}\n`);
      }
    }
  })
;

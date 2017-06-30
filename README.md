<p align="center">
  <h3 align="center">georgeous</h3>
  <p align="center">Make your console logs georgeous.<p>
  <p align="center">
    <a href="https://www.npmjs.com/package/georgeous">
      <img src="https://img.shields.io/npm/v/georgeous.svg" alt="npm version">
    </a>
    <a href="https://david-dm.org/moeriki/georgeous">
      <img src="https://david-dm.org/moeriki/georgeous/status.svg" alt="dependencies Status"></img>
    </a>
    <a href="https://snyk.io/test/github/moeriki/georgeous">
      <img src="https://snyk.io/test/github/moeriki/georgeous/badge.svg" alt="Known Vulnerabilities"></img>
    </a>
  </p>
</p>

---

## Install

```sh
npm install --save georgeous
```

## Usage

```js
const log = require('georgeous');

log('Hello World!');
log({ level: 'info', msg: 'Hello World!' });

log.info('successfully logged in', { user: 'moeriki' });

log.warn('could not get asset by ID', { id: 123 });

log.error('failure', new Error('NOPE'));

log.fatal('catastrophic failure');
```

<img src="https://raw.githubusercontent.com/Moeriki/georgeous/master/georgeous.png" />

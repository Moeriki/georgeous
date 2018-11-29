'use strict';

// exports

const defaults = ({ colorize = true, key = 'msg' }) => ({ colorize, key });

const format = (log, { colorize, key }, { levels }) => {
  let level;
  if (colorize && log.level) {
    level = levels.find(_level => _level.id === log.level);
    if (level) {
      return level.modifier(log[key]);
    }
  }
  return log[key];
};

module.exports = { defaults, format };

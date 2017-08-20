'use strict';

// exports

const defaults = ({ key = 'level' }) => ({ key });

const format = (log, { key, levels }) => {
  const level = levels.find((_level) => _level.id === log[key]);
  return level ? level.modifier(level.name) : 'none';
};

module.exports = { defaults, format };

'use strict';

process.env.NODE_ENV = 'test';
console.log('NODE_ENV:' + process.env.NODE_ENV);

require('babel-core/register')({
    presets: ['stage-3']
});

const model = require('./model');
model.sync();

console.log('init db ok.');
// process.exit(0);
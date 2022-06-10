const knex = require('knex');
const info = require('../config');

const db = knex(info);

module.exports = db; 
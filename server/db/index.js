const db = require('./database');
const { green } = require('chalk');

//import models
const Champion = require('./models/Champion');

//model relationships - if applicable

module.exports = {
    db,
    Champion
}
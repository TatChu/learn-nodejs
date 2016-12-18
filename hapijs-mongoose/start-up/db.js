'use strict';

var Mongoose = require('mongoose'),
  config = require('./config');

//Mongoose.connect(config.database.url);
Mongoose.connect('mongodb://' + config.database.host + '/' + config.database.db);  
var db = Mongoose.connection;
Mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
  console.log("Connection with database succeeded.");
});
module.exports = {};
module.exports.Mongoose = Mongoose;
module.exports.db = db;

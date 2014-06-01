'use strict';

var mongoose = require('mongoose');

exports.mongoose = mongoose;
 process.env.MONGOLAB_URI = 'mongodb://testuser:enter1@ds033489.mongolab.com:33489/fiyuh-test-db'
// Configure for possible deployment
var uristring =
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/test';

var mongoOptions = { db: { safe: true } };

// Connect to Database
mongoose.connect(uristring, mongoOptions, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Successfully connected to: ' + uristring);
  }
});

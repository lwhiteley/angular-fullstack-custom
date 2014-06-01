'use strict';

var express = require('express'),
    path = require('path');
    var morgan         = require('morgan');
    var bodyParser     = require('body-parser');
    var methodOverride = require('method-override');
    var compression         = require('compression');
    var cookieSession     = require('cookie-session');
    var cookieParser = require('cookie-parser');
    var expressSession         = require('express-session');
    var staticFavicon     = require('static-favicon');
    var responseTime = require('response-time');
    var csurf         = require('csurf');
    var vhost     = require('vhost');
    var errorhandler = require('errorhandler');
    var connectTimeout = require('connect-timeout');

module.exports = function(app) {
  var rootPath = path.normalize(__dirname + '/../..');

  var env = process.env.NODE_ENV || 'development';
  // configure development
  if ('development' == env) {
   app.use(require('connect-livereload')());

   // Disable caching of scripts for easier testing
   app.use(function noCache(req, res, next) {
     if (req.url.indexOf('/scripts/') === 0) {
       res.header("Cache-Control", "no-cache, no-store, must-revalidate");
       res.header("Pragma", "no-cache");
       res.header("Expires", 0);
     }
     next();
   });

   app.use(express.static(path.join(rootPath, '.tmp')));
   app.use(express.static(path.join(rootPath, 'app')));
   app.use(errorhandler());
   app.set('views', rootPath + '/app/views');
  }

  // configure production
  if ('production' == env) {
      app.use(staticFavicon(path.join(rootPath, 'public', 'favicon.ico')));
      app.use(express.static(path.join(rootPath, 'public')));
      app.set('views', rootPath + '/views');
  }

  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(morgan('dev'));
  app.use(bodyParser());
  app.use(methodOverride());

  // Router needs to be last @deprecated
  // app.use(app.router);

};

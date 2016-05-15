var http = require('http');
var https = require('https');

var express = require('express');
var mongoProxy = require('./lib/mongo-proxy');
var config = require('./config.js');
var passport = require('passport');
var security = require('./lib/security');
var xsrf = require('./lib/xsrf');
var protectJSON = require('./lib/protect-json');

require('express-namespace');

var app = express();
var secureServer = https.createServer(config.server.credentials, app);
var server = http.createServer(app);

require('./lib/routes/static').addRoutes(app, config);

app.use(protectJSON);
app.use(express.logger());                                  // Log requests to the console
app.use(express.bodyParser());                              // Extract the data from the body of the request - this is needed by the LocalStrategy authenticate method
app.use(express.cookieParser(config.server.cookieSecret));  // Hash cookies with this secret
app.use(express.cookieSession());                           // Store the session in the (secret) cookie
app.use(passport.initialize());                             // Initialize PassportJS
app.use(passport.session());                                // Use Passport's session authentication strategy - this stores the logged in user in the session and will now run on any request
app.use(xsrf);                                              // Add XSRF checks to the request
security.initialize(config.mongo.dbUrl, config.mongo.apiKey, config.security.dbName, config.security.usersCollection); // Add a Mongo strategy for handling the authentication

app.use(function(req, res, next) {
  if ( req.user ) {
    console.log('Current User:', req.user.firstName, req.user.lastName);
  } else {
    console.log('Unauthenticated');
  }
  next();
});

app.namespace(config.server.apiUrl, function() {
  app.all('/*', function(req, res, next) {
    req.apiUrl = req.url.replace(new RegExp(config.server.apiUrl), '');
    next();
  });

  app.namespace('/collections/:collection*', function () {
    app.all('/', function (req, res, next) {
      if (req.method !== 'GET') {
        // We require the user is authenticated to modify any collections
        security.authenticationRequired(req, res, next);
      } else {
        next();
      }
    });

    app.all('/', function (req, res, next) {
      if ( req.method !== 'GET'
        && config.security.adminRestrictedCollections.indexOf(req.params.collection) !== -1
      ) {
        // We require the current user to be admin to modify the users or projects collection
        return security.adminRequired(req, res, next);
      }
      next();
    });

    // Proxy database calls to the MongoDB
    app.all('/', mongoProxy(config.mongo.dbUrl, config.mongo.apiKey, config.security.dbName));
  });

  require('./lib/routes/security').addRoutes(app, security);
  require('./lib/routes/app').addRoutes(app, config);
});

// If nor static file nor API url were found
// then just send the index.html for other request to support HTML5Mode
app.use(config.server.staticUrl, function(req, res, next) {
  res.sendfile('index.html', { root: config.server.distFolder });
});

// A standard error handler - it picks up any left over errors and returns a nicely formatted server 500 error
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

// Start up the server on the port specified in the config
server.listen(config.server.listenPort, '0.0.0.0', 100, function() {
  // Once the server is listening we automatically open up a browser
  if (config.server.openBrowser) {
    var open = require('open');
    open('http://localhost:' + config.server.listenPort + '/');
  }
});

console.log('Angular App Server - listening on port: ' + config.server.listenPort);
secureServer.listen(config.server.securePort);
console.log('Angular App Server - listening on secure port: ' + config.server.securePort);

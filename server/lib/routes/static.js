var express = require('express');

exports.addRoutes = function(app, config) {
  // Serve up the favicon
  app.use(express.favicon(config.server.distFolder + '/favicon.ico'));

  app.use(config.server.staticUrl, express.compress());
  app.use(config.server.staticUrl, express.static(config.server.distFolder));
};
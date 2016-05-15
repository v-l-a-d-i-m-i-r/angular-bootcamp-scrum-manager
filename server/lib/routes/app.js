exports.addRoutes = function(app, config) {
  app.get('/health-check', function(req, res) {
    res.json({ status: true });
    res.end();
  });

  app.all('/*', function(req, res) {
    res.send(404)
  });
};
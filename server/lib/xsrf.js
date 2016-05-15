var crypto = require('crypto');
var uuid = require('uuid');

// The xsrf middleware provide AngularJS style XSRF-TOKEN provision and validation
// Add it to your server configuration after the session middleware:
//   app.use(xsrf);
//  
module.exports = function(req, res, next) {
  // Generate XSRF token
  var token = req.session._csrf || (req.session._csrf = uuid.v4());
  // Get the token in the current request
  var requestToken = req.headers['x-xsrf-token'];
  // Add it to the cookie
  res.cookie('XSRF-TOKEN', token);

  // Ignore if it is just a read-only request
  switch(req.method) {
    case 'GET':
    case 'HEAD':
    case 'OPTIONS':
      break;
    default:
      // Check the token in the request against the one stored in the session
      if ( requestToken !== token ) {
        return res.send(403);
      }
  }
  // All is OK, continue as you were.
  return next();
};
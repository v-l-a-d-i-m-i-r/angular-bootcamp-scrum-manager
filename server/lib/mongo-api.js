// code for initializing the DB w/ an admin user
var request = require('request');

var mongoApi = {
  adminUser: { email: 'admin@admin.com', password: 'password', admin: true, firstName: 'Admin', lastName: 'System' },

  initialize: function(conig) {
    mongoApi.apiKey = conig.mongo.apiKey;
    mongoApi.baseUrl = conig.mongo.dbUrl + conig.security.dbName + '/collections/';
    mongoApi.usersCollection = conig.security.usersCollection;
  },
  
  _checkDocument: function(collection, query, done) {
    var url = mongoApi.baseUrl + collection + '/';
    var params = { apiKey: mongoApi.apiKey, q: JSON.stringify(query) };

    console.log("request.get - " + url);

    request.get(url, { qs: params, json: {} }, function(err, response, data) {
      if (err) {
        console.log('There was an error checking the documents', err);
      }
      done(err, data);
    });
  },
  
  _createDocument: function(collection, doc, done) {
    var url = mongoApi.baseUrl + collection + '/';
    console.log("request.post - " + url);
    request.post(url, { qs: { apiKey: mongoApi.apiKey }, json: doc }, function(err, response, data) {
      if ( !err ) {
        console.log('Document created', data);
      }
      done(err, data);
    });
  },
  
  _deleteDocument: function(collection, $oid, done) {
    var url = mongoApi.baseUrl + collection + '/' + $oid;
    console.log("request.delete - " + url);
    request.del(url, { qs: { apiKey:mongoApi.apiKey }, json: {} }, function(err, response, data) {
      if ( !err ) {
        console.log('Document deleted', data);
      }
      done(err, data);
    });
  },

  addUser: function(data, done) {
    if (!data.email || !data.password) {
      return done(new Error('Cannot create user with empty email or password'));
    }
    if (!data.admin) {
      data.admin = false;
    }

    var account = (data.admin ? 'admin' : 'user');

    console.log('Checking that ' + account + ' does not exist...');
    mongoApi._checkDocument(mongoApi.usersCollection, { email: data.email }, function(err, body) {
      if (!err && body.length === 0) {
        console.log('Creating new ' + account + '...', err, data);

        mongoApi._createDocument(mongoApi.usersCollection, data, function(err, data) {
          console.log('Created new ' + account + '...');
          console.log(data);

          if (err) {
            console.log(err);
          }
          done(err, data);
        });
      } else {
        var message = err && err.message || body.message || (account + ' already exists');

        console.log('Error: ' + message);
        done(err || new Error(message), data);
      }
    });
  },
  
  addAdminUser: function(done) {
    console.log('*** Admin user properties:', mongoApi.adminUser);
    mongoApi.addUser(mongoApi.adminUser, done);
  }
};

mongoApi.initialize(require('../config'));
module.exports = mongoApi;


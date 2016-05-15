var express = require('express');
var passport = require('passport');
var MongoStrategy = require('./mongo-strategy');
var MongoApi = require('./mongo-api');

var filterUser = function (user) {
  return user ? {
      user : {
        id: user._id.$oid,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        admin: user.admin
      }
    } : {
      user: {
        id: null
      }
    };
};

var security = {
  initialize: function(url, apiKey, dbName, authCollection) {
    passport.use(new MongoStrategy(url, apiKey, dbName, authCollection));
  },

  authenticationRequired: function(req, res, next) {
    console.log('authRequired');
    if (req.isAuthenticated()) {
      next();
    } else {
      res.json(401, filterUser(req.user));
    }
  },

  adminRequired: function(req, res, next) {
    console.log('adminRequired');
    if (req.user && req.user.admin ) {
      next();
    } else {
      res.json(401, filterUser(req.user));
    }
  },

  sendCurrentUser: function(req, res, next) {
    res.json(200, filterUser(req.user));
    res.end();
  },

  signin: function(req, res, next) {
    function authenticationFailed(err, user, info){
      if (err) { return next(err); }
      if (!user) { return res.json(filterUser(user)); }
      req.logIn(user, function(err) {
        if ( err ) { return next(err); }
        return res.json(filterUser(user));
      });
    }
    return passport.authenticate(MongoStrategy.name, authenticationFailed)(req, res, next);
  },

  signout: function(req, res, next) {
    req.logout();
    res.send(204);
  },

  signup: function(req, res, next) {
    var data = req.body;
    data.admin = false;

    MongoApi.addUser(req.body, function(err) {
      if (err) {
        next(err);
      } else {
        res.send(201);
      }
    });
  }
};

module.exports = security;
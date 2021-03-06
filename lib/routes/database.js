'use strict';

var utils = require('../utils');

var routes = function () {
  var exp = {};

  exp.addDatabase = function (req, res) {

    var name = req.body.database;
    if (!utils.isValidDatabaseName(name)) {
      // TODO: handle error
      console.error('That database name is invalid.');
      req.session.error = 'That database name is invalid.';
      return res.redirect('back');
    }

    var ndb = req.mainConn.db(name);

    ndb.createCollection('delete_me', function (err) {
      if (err) {
        //TODO: handle error
        console.error('Could not create collection.');
        req.session.error = 'Could not create collection.';
        return res.redirect('back');
      }

      res.redirect(res.locals.baseHref);

      // ndb.dropCollection('delete_me', function(err) {
      //   if (err) {
      //     //TODO: handle error
      //     console.error('Could not delete collection.');
      //     req.session.error = 'Could not delete collection.';
      //     return res.redirect('back');
      //   }
      //   res.redirect(res.locals.baseHref + 'db/' + name);
      // });
    });

  };

  exp.deleteDatabase = function (req, res) {
    req.db.dropDatabase(function (err) {
      if (err) {
        //TODO: handle error
        console.error('Could not to delete database.');
        req.session.error = 'Failed to delete database.';
        return res.redirect('back');
      }

      res.redirect(res.locals.baseHref);
    });
  };

  return exp;
};

module.exports = routes;

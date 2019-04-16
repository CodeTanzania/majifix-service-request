'use strict';

/* ensure mongo uri */
process.env.MONGODB_URI =
  (process.env.MONGODB_URI || 'mongodb://localhost/majifix-service-request');


/* dependencies */
const path = require('path');
const _ = require('lodash');
const async = require('async');
const mongoose = require('mongoose');
// mongoose.set('debug', true);
const { Jurisdiction } = require('@codetanzania/majifix-jurisdiction');
const { Priority } = require('@codetanzania/majifix-priority');
const { Status } = require('@codetanzania/majifix-status');
const { ServiceGroup } = require('@codetanzania/majifix-service-group');
const { Service } = require('@codetanzania/majifix-service');
const { ServiceRequest, router, info, app } = require(path.join(__dirname, '..'));
let samples = require('./samples')(20);


/* connect to mongoose */
mongoose.connect(process.env.MONGODB_URI);


function boot() {

  async.waterfall([

    function clearServiceRequests(next) {
      ServiceRequest.remove(function ( /*error, results*/ ) {
        next();
      });
    },

    function clearServices(next) {
      Service.remove(function ( /*error, results*/ ) {
        next();
      });
    },

    function clearServiceGroups(next) {
      ServiceGroup.remove(function ( /*error, results*/ ) {
        next();
      });
    },

    function clearStatuses(next) {
      Status.remove(function ( /*error, results*/ ) {
        next();
      });
    },

    function clearPriorities(next) {
      Priority.remove(function ( /*error, results*/ ) {
        next();
      });
    },

    function clearJurisdictions(next) {
      Jurisdiction.remove(function ( /*error, results*/ ) {
        next();
      });
    },

    function seedJurisdiction(next) {
      const jurisdiction = Jurisdiction.fake();
      jurisdiction.post(next);
    },

    function seedPriority(jurisdiction, next) {
      const priority = Priority.fake();
      priority.jurisdiction = jurisdiction;
      priority.post(function (error, created) {
        next(error, jurisdiction, created);
      });
    },

    function seedStatus(jurisdiction, priority, next) {
      const status = Status.fake();
      status.jurisdiction = jurisdiction;
      status.post(function (error, created) {
        next(error, jurisdiction, priority, created);
      });
    },

    function seedServiceGroup(jurisdiction, priority, status, next) {
      const group = ServiceGroup.fake();
      group.jurisdiction = jurisdiction;
      group.post(function (error, created) {
        next(error, jurisdiction, priority, status, created);
      });
    },

    function seedService(jurisdiction, priority, status, group, next) {
      const service = Service.fake();
      service.jurisdiction = jurisdiction;
      service.group = group;
      service.priority = priority;
      service.post(function (error, created) {
        next(error, jurisdiction, priority, status, group, created);
      });
    },

    function seed(jurisdiction, priority, status, group, service, next) {
      /* fake servicerequests */
      samples = _.map(samples, function (sample) {
        sample.jurisdiction = jurisdiction;
        sample.group = group;
        sample.service = service;
        sample.priority = priority;
        sample.status = status;
        return sample;
      });
      ServiceRequest.create(samples, next);
    }

  ], function (error, results) {

    /* expose module info */
    app.get('/', function (request, response) {
      response.status(200);
      response.json(info);
    });

    /* fire the app */
    app.start(function (error, env) {
      console.log(
        `visit http://0.0.0.0:${env.PORT}/v${router.apiVersion}/servicerequests`
      );
    });

  });

}

boot();

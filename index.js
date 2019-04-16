'use strict';


/**
 * @name majifix-service-request
 * @description A representation of an issue(or service request) 
 * reported by a civilian(or customer) e.g Water Leakage occur at 
 * a particular area.
 * 
 * @author lally elias <lallyelias87@mail.com>
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @license MIT
 * @example
 *
 * const { app } = require('majifix-service-request');
 *
 * ...
 *
 * app.start();
 *
 *
 */


/* dependencies */
const path = require('path');
const _ = require('lodash');
const app = require('@lykmapipo/express-common');


/* declarations */
const pkg = require(path.join(__dirname, 'package.json'));
const fields = [
  'name',
  'description',
  'version',
  'license',
  'homepage',
  'repository',
  'bugs',
  'sandbox',
  'contributors'
];
const info = _.merge({}, _.pick(pkg, fields));


/* ensure api version */
process.env.API_VERSION = (process.env.API_VERSION || info.version);


/* export package(module) info */
exports.info = info;


/* import models */
const ServiceRequest =
  require(path.join(__dirname, 'lib', 'servicerequest.model'));


/* import routers*/
const router =
  require(path.join(__dirname, 'lib', 'http.router'));


/* export service request model */
exports.ServiceRequest = ServiceRequest;


/* export service request router */
exports.router = router;


/* export app */
Object.defineProperty(exports, 'app', {
  get() {

    //TODO bind oauth middlewares authenticate, token, authorize

    /* bind service request router */
    app.mount(router);
    return app;
  }

});
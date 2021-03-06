'use strict';

/**
 * @name preValidate
 * @function preValidate
 * @description service request pre validate logic
 * @see {@link ServiceRequest}
 * @author lally elias <lallyelias87@mail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @return {Function} valid mongoose plugin
 * @public
 */

/* dependencies */
const path = require('path');
const _ = require('lodash');
const async = require('async');
const mongoose = require('mongoose');
const moment = require('moment');
const Counter = require(path.join(__dirname, '..', 'counter.model'));

/* @todo refactor */
/* @todo clear dead codes */

module.exports = exports = function preValidatePlugin(schema /*, options*/) {
  schema.methods.preValidate = function _preValidate(done) {
    //ref

    //compute expected time to resolve the issue
    //based on service level agreement
    if (!this.expectedAt && this.service) {
      //obtain sla expected time ttr
      const sla = _.get(this.service, 'sla.ttr');
      if (sla) {
        //compute time to when a service request(issue)
        //is expected to be resolve
        this.expectedAt = moment(this.createdAt)
          .add(sla, 'hours')
          .toDate(); //or h
      }
    }

    //compute time to resolve (ttr) in milliseconds
    if (this.resolvedAt) {
      //always ensure positive time diff
      let ttr = this.resolvedAt.getTime() - this.createdAt.getTime();

      //ensure resolve time is ahead of creation time
      // TODO remove jshint ignore once migrated to eslint
      /* jshint ignore:start */
      this.resolvedAt =
        ttr > 0
          ? this.resolvedAt
          : (this.resolvedAt = new Date(this.createdAt.getTime() + -ttr));
      /* jshint ignore:end */

      //ensure positive ttr
      ttr = ttr > 0 ? ttr : -ttr;
      this.ttr = { milliseconds: ttr };
    }

    //ensure jurisdiction from service
    const jurisdiction = _.get(this.service, 'jurisdiction');
    if (!this.jurisdiction && jurisdiction) {
      this.jurisdiction = jurisdiction;
    }

    //ensure group from service
    const group = _.get(this.service, 'group');
    if (!this.group && group) {
      this.group = group;
    }

    //ensure priority from service
    const priority = _.get(this.service, 'priority');
    if (!this.priority && priority) {
      this.priority = priority;
    }

    //set default status & priority if not set
    //TODO preload default status & priority
    //TODO find nearby jurisdiction using request geo data
    if (!this.status || !this.priority || !this.code || _.isEmpty(this.code)) {
      async.parallel(
        {
          jurisdiction: function(next) {
            const Jurisdiction = mongoose.model('Jurisdiction');
            const id = _.get(this.jurisdiction, '_id', this.jurisdiction);
            Jurisdiction.findById(id, next);
          }.bind(this),

          group: function(next) {
            const ServiceGroup = mongoose.model('ServiceGroup');
            const id = _.get(this.group, '_id', this.group);
            ServiceGroup.findById(id, next);
          }.bind(this),

          service: function(next) {
            const Service = mongoose.model('Service');
            const id = _.get(this.service, '_id', this.service);
            Service.findById(id, next);
          }.bind(this),

          status: function findDefaultStatus(next) {
            const Status = mongoose.model('Status');
            Status.findDefault(next);
          },
          priority: function findDefaultPriority(next) {
            const Priority = mongoose.model('Priority');
            Priority.findDefault(next);
          },
        },
        function(error, result) {
          if (error) {
            return done(error);
          } else {
            //ensure jurisdiction & service
            if (!result.jurisdiction) {
              error = new Error('Jurisdiction Not Found');
              error.status = 400;
              return done(error);
            }

            //ensure service
            if (!result.service) {
              error = new Error('Service Not Found');
              error.status = 400;
              return done(error);
            }

            //set group, status and priority
            // TODO fix with exist and refesh fields
            this.service = this.service || result.service || undefined;
            this.group =
              this.group || result.group || this.service.group || undefined;
            this.status = this.status || result.status || undefined;
            this.priority = this.priority || result.priority || undefined;

            //set service request code(ticket number)
            //in format (Area Code Service Code Year Sequence)
            //i.e ILLK170001
            if (_.isEmpty(this.code)) {
              Counter.generate(
                {
                  jurisdiction: result.jurisdiction.code,
                  service: result.service.code,
                },
                function(error, ticketNumber) {
                  this.code = ticketNumber;
                  return done(error, this);
                }.bind(this)
              );
            }

            //continue
            else {
              return done(null, this);
            }
          }
        }.bind(this)
      );
    }

    //continue
    else {
      return done(null, this);
    }
  };
};

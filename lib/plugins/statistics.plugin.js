'use strict';

/* dependencies */
const _ = require('lodash');
const { parallel } = require('async');
const parseMs = require('parse-ms');
const { model } = require('@lykmapipo/mongoose-common');

// TODO refactor to majifix-analytics
// TODO implement unit and integration tests

const statistics = (schema /*, options*/) => {
  /**
   * @name countResolved
   * @description count resolved issues so far
   * @param  {Function} done a callback to be invoked on success or failure
   * @since 0.1.0
   * @version 0.1.0
   * @public
   * @type {Function}
   */
  schema.statics.countResolved = function(done) {
    //TODO move to aggregation framework to support more operations

    //refs
    const ServiceRequest = model('ServiceRequest');

    //count total resolved issue so far
    ServiceRequest.aggregated()
      .match({ resolvedAt: { $ne: null } })
      .append({ $count: 'count' })
      .exec(function(error, count) {
        count = (_.first(count) || {}).count || 0;
        done(error, count);
      });
  };

  /**
   * @name countUnResolved
   * @description count un resolved issues so far
   * @param  {Function} done a callback to be invoked on success or failure
   * @since 0.1.0
   * @version 0.1.0
   * @public
   * @type {Function}
   */
  schema.statics.countUnResolved = function(done) {
    //TODO move to aggregation framework to support more operations

    //refs
    const ServiceRequest = model('ServiceRequest');

    //count total un resolved issue so far
    ServiceRequest.aggregated()
      .match({ resolvedAt: { $eq: null } })
      .append({ $count: 'count' })
      .exec(function(error, count) {
        count = (_.first(count) || {}).count || 0;
        done(error, count);
      });
  };

  /**
   * @name countPerJurisdiction
   * @description count issue reported per jurisdiction
   * @param  {Function} done a callback to be invoked on success or failure
   * @since 0.1.0
   * @version 0.1.0
   * @public
   * @type {Function}
   */
  schema.statics.countPerJurisdiction = function(done) {
    //refs
    const ServiceRequest = model('ServiceRequest');

    //count issue per service
    ServiceRequest.aggregated()
      .group({
        _id: '$jurisdiction.name',
        code: { $first: '$jurisdiction.code' },
        color: { $first: '$jurisdiction.color' },
        count: { $sum: 1 },
      })
      .project({
        jurisdiction: '$_id',
        code: '$code',
        color: '$color',
        count: '$count',
      })
      .project({ _id: 0, jurisdiction: 1, code: 1, color: 1, count: 1 })
      .exec(function(error, countPerJurisdiction) {
        done(error, countPerJurisdiction);
      });
  };

  /**
   * @name countPerMethod
   * @description count issue reported per method
   * @param  {Function} done a callback to be invoked on success or failure
   * @since 0.1.0
   * @version 0.1.0
   * @public
   * @type {Function}
   */
  schema.statics.countPerMethod = function(done) {
    //refs
    const ServiceRequest = model('ServiceRequest');

    //count issue per method used to report
    ServiceRequest.aggregated()
      .group({
        _id: '$method',
        count: { $sum: 1 },
      })
      .project({ method: '$_id', count: '$count' })
      .project({ _id: 0, method: 1, count: 1 })
      .exec(function(error, countPerMethod) {
        done(error, countPerMethod);
      });
  };

  /**
   * @name countPerGroup
   * @description count issue reported per service group(category)
   * @param  {Function} done a callback to be invoked on success or failure
   * @since 0.1.0
   * @version 0.1.0
   * @public
   * @type {Function}
   */
  schema.statics.countPerGroup = function(done) {
    //refs
    const ServiceRequest = model('ServiceRequest');

    //count issue per service group
    ServiceRequest.aggregated()
      .group({
        _id: '$group.name',
        color: { $first: '$group.color' },
        count: { $sum: 1 },
      })
      .project({ group: '$_id', color: '$color', count: '$count' })
      .project({ _id: 0, group: 1, color: 1, count: 1 })
      .exec(function(error, countPerGroup) {
        done(error, countPerGroup);
      });
  };

  /**
   * @name countPerService
   * @description count issue reported per service
   * @param  {Function} done a callback to be invoked on success or failure
   * @since 0.1.0
   * @version 0.1.0
   * @public
   * @type {Function}
   */
  schema.statics.countPerService = function(done) {
    //refs
    const ServiceRequest = model('ServiceRequest');

    //count issue per service
    ServiceRequest.aggregated()
      .group({
        _id: '$service.name',
        color: { $first: '$service.color' },
        count: { $sum: 1 },
      })
      .project({ service: '$_id', color: '$color', count: '$count' })
      .project({ _id: 0, service: 1, color: 1, count: 1 })
      .exec(function(error, countPerGroup) {
        done(error, countPerGroup);
      });
  };

  /**
   * @name countPerOperator
   * @description count issue reported per service
   * @param  {Function} done a callback to be invoked on success or failure
   * @since 0.1.0
   * @version 0.1.0
   * @public
   * @type {Function}
   */
  schema.statics.countPerOperator = function(done) {
    //refs
    const ServiceRequest = model('ServiceRequest');

    //count issue per service
    ServiceRequest.aggregated()
      .group({
        _id: '$operator.name',
        count: { $sum: 1 },
      })
      .project({ operator: '$_id', count: '$count' })
      .project({ _id: 0, operator: 1, count: 1 })
      .exec(function(error, countPerOperator) {
        done(error, countPerOperator);
      });
  };

  /**
   * @name countPerStatus
   * @description count issue reported per status
   * @param  {Function} done a callback to be invoked on success or failure
   * @since 0.1.0
   * @version 0.1.0
   * @public
   * @type {Function}
   */
  schema.statics.countPerStatus = function(done) {
    //refs
    const ServiceRequest = model('ServiceRequest');

    //count issue per method used to report
    ServiceRequest.aggregated()
      .group({
        _id: '$status.name.en',
        color: { $first: '$status.color' },
        count: { $sum: 1 },
      })
      .project({ status: '$_id', color: '$color', count: '$count' })
      .project({ _id: 0, status: 1, color: 1, count: 1 })
      .exec(function(error, countPerStatus) {
        done(error, countPerStatus);
      });
  };

  /**
   * @name countPerPriority
   * @description count issue reported per priority
   * @param  {Function} done a callback to be invoked on success or failure
   * @since 0.1.0
   * @version 0.1.0
   * @public
   * @type {Function}
   */
  schema.statics.countPerPriority = function(done) {
    //refs
    const ServiceRequest = model('ServiceRequest');

    //count issue per method used to report
    ServiceRequest.aggregated()
      .group({
        _id: '$priority.name.en',
        color: { $first: '$priority.color' },
        count: { $sum: 1 },
      })
      .project({ priority: '$_id', color: '$color', count: '$count' })
      .project({ _id: 0, priority: 1, color: 1, count: 1 })
      .exec(function(error, countPerPriority) {
        done(error, countPerPriority);
      });
  };

  /**
   * @name calculateAverageCallDuration
   * @description compute average call duration
   * @param  {Function} done a callback to be invoked on success or failure
   * @since 0.1.0
   * @version 0.1.0
   * @public
   * @type {Function}
   */
  schema.statics.calculateAverageCallDuration = function(done) {
    //refs
    const ServiceRequest = model('ServiceRequest');

    //compute average call duration
    ServiceRequest.aggregated()
      .group({
        _id: null,
        duration: { $avg: '$call.duration.milliseconds' },
      })
      .project({ _id: 0, duration: 1 })
      .exec(function(error, durations) {
        //obtain average duration
        let duration = _.first(durations).duration || 0;
        duration = parseMs(duration);

        done(error, duration);
      });
  };

  /**
   * @name standings
   * @description count issue reported per jurisdiction, per group, per service,
   *              per status, per priority
   * @param  {Function} done a callback to be invoked on success or failure
   * @since 0.1.0
   * @version 0.1.0
   * @public
   * @type {Function}
   */
  schema.statics.standings = function(criteria, done) {
    //normalize arguments
    if (_.isFunction(criteria)) {
      done = criteria;
      criteria = {};
    }

    //refs
    const ServiceRequest = model('ServiceRequest');

    //count issues
    ServiceRequest.aggregated(criteria)
      .group({
        //1 stage: count per jurisdiction, group, service, status and priority
        _id: {
          jurisdiction: '$jurisdiction.name',
          group: '$group.name.en',
          service: '$service.name.en',
          status: '$status.name.en',
          priority: '$priority.name.en',
        },

        //selected jurisdiction fields
        _jurisdiction: { $first: '$jurisdiction' },

        //select service group fields
        _group: { $first: '$group' },

        //select service fields
        _service: { $first: '$service' },

        //select status fields
        _status: { $first: '$status' },

        //select priority fields
        _priority: { $first: '$priority' },

        count: { $sum: 1 },
      })
      .project({
        //2 stage: project only required fields
        _id: 1,
        count: 1,
        _jurisdiction: { name: 1, code: 1, color: 1 },
        _group: { name: 1, code: 1, color: 1 },
        _service: { name: 1, code: 1, color: 1 },
        _status: { name: 1, color: 1, weight: 1 },
        _priority: { name: 1, color: 1, weight: 1 },
      })
      .project({
        //3 stage: project full grouped by documents
        _id: 0,
        count: 1,
        jurisdiction: '$_jurisdiction',
        group: '$_group',
        service: '$_service',
        status: '$_status',
        priority: '$_priority',
      })
      .exec(function(error, standings) {
        //map to support legacy
        standings = _.map(standings, function(standing) {
          standing.group.name = standing.group.name.en;
          standing.service.name = standing.service.name.en;
          standing.priority.name = standing.priority.name.en;
          standing.status.name = standing.status.name.en;
          return standing;
        });

        done(error, standings);
      });
  };

  /**
   * @name overviews
   * @description compute current issue overview/pipeline
   * @param  {Function} done a callback to be invoked on success or failure
   * @since 0.1.0
   * @version 0.1.0
   * @public
   * @type {Function}
   * @deprecated
   */
  schema.statics.overviews = function(done) {
    //refs
    const ServiceRequest = model('ServiceRequest');

    //TODO make use of  aggregation facet

    parallel(
      {
        //total, resolved, un-resolved count & average call duration
        issues: function(next) {
          parallel(
            {
              total: function(then) {
                ServiceRequest.count({}, then);
              },
              resolved: function(then) {
                ServiceRequest.countResolved(then);
              },
              unresolved: function(then) {
                ServiceRequest.countUnResolved(then);
              },
              averageCallDuration: function(then) {
                ServiceRequest.calculateAverageCallDuration(then);
              },
            },
            next
          );
        },

        //count issue per jurisdiction
        jurisdictions: function(next) {
          ServiceRequest.countPerJurisdiction(next);
        },

        //count issue per method used for reporting
        methods: function(next) {
          ServiceRequest.countPerMethod(next);
        },

        //count issue per service group
        groups: function(next) {
          ServiceRequest.countPerGroup(next);
        },

        //count issue per service
        services: function(next) {
          ServiceRequest.countPerService(next);
        },

        //count issue per operator
        operator: function(next) {
          ServiceRequest.countPerOperator(next);
        },

        //count issue per statuses
        statuses: function(next) {
          ServiceRequest.countPerStatus(next);
        },

        //count issue per priorities
        priorities: function(next) {
          ServiceRequest.countPerPriority(next);
        },
      },
      done
    );
  };

  /**
   * @name summary
   * @description compute unresolved reported issue count summaries
   * @param  {Function} done a callback to be invoked on success or failure
   * @since 0.1.0
   * @version 0.1.0
   * @public
   * @type {Function}
   */
  schema.statics.summary = function(criteria, done) {
    //normalize arguments
    if (_.isFunction(criteria)) {
      done = criteria;
      criteria = {};
    }
    criteria = _.merge({}, _.pick(criteria, 'jurisdiction')); //clone criteria

    //references
    const Service = model('Service');
    const Status = model('Status');
    const Jurisdiction = model('Jurisdiction');
    const Priority = model('Priority');
    const ServiceRequest = model('ServiceRequest');

    //TODO use aggregation
    parallel(
      {
        services: function(next) {
          Service.find({}) //TODO select for specific jurisdiction
            .exec(function(error, services) {
              if (error) {
                next(null, {});
              } else {
                const works = {};
                _.forEach(services, function(service) {
                  works[service._id] = function(then) {
                    ServiceRequest.count(
                      _.merge({}, criteria, {
                        service: service._id,
                        resolvedAt: null,
                      })
                    ).exec(then);
                  };
                });
                parallel(works, next);
              }
            });
        },

        statuses: function(next) {
          Status.find({}).exec(function(error, statuses) {
            if (error) {
              next(null, {});
            } else {
              const works = {};
              _.forEach(statuses, function(status) {
                works[status._id] = function(then) {
                  ServiceRequest.count(
                    _.merge({}, criteria, {
                      status: status._id,
                      resolvedAt: null,
                    })
                  ).exec(then);
                };
              });
              parallel(works, next);
            }
          });
        },

        priorities: function(next) {
          Priority.find({}).exec(function(error, priorities) {
            if (error) {
              next(null, {});
            } else {
              const works = {};
              _.forEach(priorities, function(priority) {
                works[priority._id] = function(then) {
                  ServiceRequest.count(
                    _.merge({}, criteria, {
                      priority: priority._id,
                      resolvedAt: null,
                    })
                  ).exec(then);
                };
              });
              parallel(works, next);
            }
          });
        },

        jurisdictions: function(next) {
          Jurisdiction.find({}).exec(function(error, jurisdictions) {
            if (error) {
              next(null, {});
            } else {
              const works = {};
              _.forEach(jurisdictions, function(jurisdiction) {
                works[jurisdiction._id] = function(then) {
                  ServiceRequest.count(
                    _.merge({}, criteria, {
                      jurisdiction: jurisdiction._id,
                      resolvedAt: null,
                    })
                  ).exec(then);
                };
              });
              parallel(works, next);
            }
          });
        },
      },
      function(error, results) {
        done(error, results);
      }
    );
  };
};

/* exports */
module.exports = exports = statistics;

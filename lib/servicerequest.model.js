'use strict';

/**
 * @module ServiceRequest
 * @name ServiceRequest
 * @description A representation of an issue(or service request)
 * reported by a civilian(or customer) e.g Water Leakage occur at
 * a particular area.
 *
 * @requires https://github.com/CodeTanzania/majifix-jurisdiction
 * @requires https://github.com/CodeTanzania/majifix-service
 * @see {@link https://github.com/CodeTanzania/majifix-jurisdiction|Jurisdiction}
 * @see {@link https://github.com/CodeTanzania/majifix-service|Service}
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 * @example
 * const { ServiceRequest }= require('majifix-service-request');
 *
 * ...
 *
 * ServiceRequest.findOne(<criteria>).exec(done);
 *
 * ...
 *
 */

/* @todo add country data */

/* dependencies */
const path = require('path');
const _ = require('lodash');
const mongoose = require('mongoose');
const async = require('async');
const actions = require('mongoose-rest-actions');
const sync = require('open311-api-sync');
const parseMs = require('parse-ms');
const { Point } = require('mongoose-geojson-schemas');
const { isProduction, getBoolean, getString } = require('@lykmapipo/env');
const { Jurisdiction } = require('@codetanzania/majifix-jurisdiction');
const { models } = require('@codetanzania/majifix-common');
const { ServiceGroup } = require('@codetanzania/majifix-service-group');
const { Priority } = require('@codetanzania/majifix-priority');
const { Status } = require('@codetanzania/majifix-status');
const { Service } = require('@codetanzania/majifix-service');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

/* local constants */
const MODEL_NAME = 'ServiceRequest';
const AUTOPOPULATE_MAX_DEPTH = 1;
const OPTION_AUTOPOPULATE = {
  select: {
    jurisdiction: 1,
    group: 1,
    service: 1,
    priority: 1,
    status: 1,
    code: 1,
    reporter: 1,
    location: 1,
  },
  maxDepth: AUTOPOPULATE_MAX_DEPTH,
};
const { SERVICEREQUEST_MODEL_NAME } = models;

const SCHEMA_OPTIONS = { timestamps: true, emitIndexErrors: true };

/* ref population options */
const JURISDICTION_AUTOPOPULATE = _.merge(
  {},
  Jurisdiction.OPTION_AUTOPOPULATE,
  { path: 'jurisdiction', maxDepth: AUTOPOPULATE_MAX_DEPTH }
);

const SERVICEGROUP_AUTOPOPULATE = _.merge(
  {},
  ServiceGroup.OPTION_AUTOPOPULATE,
  { path: 'group', maxDepth: AUTOPOPULATE_MAX_DEPTH }
);

const SERVICE_AUTOPOPULATE = _.merge({}, Service.OPTION_AUTOPOPULATE, {
  path: 'service',
  maxDepth: AUTOPOPULATE_MAX_DEPTH,
});

const PRIORITY_AUTOPOPULATE = _.merge({}, Priority.OPTION_AUTOPOPULATE, {
  path: 'priority',
  maxDepth: AUTOPOPULATE_MAX_DEPTH,
});

const STATUS_AUTOPOPULATE = _.merge({}, Status.OPTION_AUTOPOPULATE, {
  path: 'status',
  maxDepth: AUTOPOPULATE_MAX_DEPTH,
});

const OPTION_AUTOPOPULATES = [];

/* declarations */
const schemaPath = path.join(__dirname, 'schemas');
const Reporter = require(path.join(schemaPath, 'reporter.schema'));
const ContactMethod = require(path.join(schemaPath, 'contactmethod.schema'));
const Duration = require(path.join(schemaPath, 'duration.schema'));
const Call = require(path.join(schemaPath, 'call.schema'));
const Media = require(path.join(schemaPath, 'media.schema'));

/* plugins */
const pluginsPath = path.join(__dirname, 'plugins');
const notification = require(path.join(pluginsPath, 'notification.plugin'));
const aggregated = require(path.join(pluginsPath, 'aggregated.plugin'));
const open311 = require(path.join(pluginsPath, 'open311.plugin'));
const overview = require(path.join(pluginsPath, 'overview.plugin'));
const performancePlugin = require(path.join(pluginsPath, 'performance.plugin')); // TODO remae this to performance after migrating to eslint
const pipeline = require(path.join(pluginsPath, 'pipeline.plugin'));
const work = require(path.join(pluginsPath, 'work.plugin'));
const duration = require(path.join(pluginsPath, 'duration.plugin'));
// const changelog = require(path.join(pluginsPath, 'changelog.plugin'));
const preValidate = require(path.join(pluginsPath, 'prevalidate.plugin'));

/**
 * @name ServiceRequestSchema
 * @type {Schema}
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
const ServiceRequestSchema = new Schema(
  {
    /**
     * @name jurisdiction
     * @description A jurisdiction responsible in handling service
     * request(issue)
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {string} ref - referenced collection
     * @property {boolean} required - mark required
     * @property {boolean} exists - ensure ref exists before save
     * @property {object} autopopulate - jurisdiction population options
     * @property {boolean} index - ensure database index
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     */
    jurisdiction: {
      type: ObjectId,
      ref: Jurisdiction.MODEL_NAME,
      required: true,
      exists: { refresh: true },
      autopopulate: JURISDICTION_AUTOPOPULATE,
      index: true,
      fake: () => Jurisdiction.fake(),
    },

    /**
     * @name group
     * @description A service group undewhich request(issue) belongs to
     * e.g Sanitation
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {string} ref - referenced collection
     * @property {boolean} required - mark required
     * @property {boolean} exists - ensure ref exists before save
     * @property {object} autopopulate - jurisdiction population options
     * @property {boolean} index - ensure database index
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     */
    group: {
      type: ObjectId,
      ref: ServiceGroup.MODEL_NAME,
      required: true,
      exists: { refresh: true },
      autopopulate: SERVICEGROUP_AUTOPOPULATE,
      index: true,
      fake: () => Jurisdiction.fake(),
    },

    /**
     * @name service
     * @description A service under which request(issue) belongs to
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {string} ref - referenced collection
     * @property {boolean} required - mark required
     * @property {boolean} exists - ensure ref exists before save
     * @property {object} autopopulate - jurisdiction population options
     * @property {boolean} index - ensure database index
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     */
    service: {
      type: ObjectId,
      ref: Service.MODEL_NAME,
      required: true,
      exists: { refresh: true },
      autopopulate: SERVICE_AUTOPOPULATE,
      index: true,
      fake: () => Service.fake(),
    },

    /**
     * @name priority
     * @description A priority of the service request(issue).
     *              It used to weight a service request(issue) relative to other(s).
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {string} ref - referenced collection
     * @property {boolean} required - mark required
     * @property {boolean} exists - ensure ref exists before save
     * @property {object} autopopulate - jurisdiction population options
     * @property {boolean} index - ensure database index
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     */
    priority: {
      type: ObjectId,
      ref: Priority.MODEL_NAME,
      required: true,
      exists: { refresh: true },
      autopopulate: PRIORITY_AUTOPOPULATE,
      index: true,
      fake: () => Priority.fake(),
    },

    /**
     * @name status
     * @description A current status of the service request(issue).
     * It used to track service request pipeline.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {string} ref - referenced collection
     * @property {boolean} required - mark required
     * @property {boolean} exists - ensure ref exists before save
     * @property {object} autopopulate - jurisdiction population options
     * @property {boolean} index - ensure database index
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     */
    status: {
      type: ObjectId,
      ref: Status.MODEL_NAME,
      required: true,
      exists: { refresh: true },
      autopopulate: STATUS_AUTOPOPULATE,
      index: true,
      fake: () => Status.fake(),
    },

    /**
     * @name operator
     * @description A party oversee the work on the service request(issue).
     *
     *              It also a party that is answerable for the progress and
     *              status of the service request(issue) to a reporter.
     *
     *              For jurisdiction that own a call center, then operator is
     *              a person who received a call.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property ref - referenced collection
     * @property {boolean} index - ensure database index
     * @property {boolean} exists - ensure ref exists before save
     * @see  {@link Party}
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     */
    operator: {
      type: ObjectId,
      ref: 'Party',
      index: true,
      exists: { refresh: true }
    },

    /**
     * @name assignee
     * @description A party assigned to work on the service request(issue).
     *
     *              It also a party that is answerable for the progress and
     *              status of the service request(issue) to operator and overall
     *              jurisdiction administrative structure.
     *
     * @type {Object}
     * @property {object} type - schema(data) type
     * @property ref - referenced collection
     * @property {boolean} index - ensure database index
     * @property {boolean} exists - ensure ref exists before save
     * @see {@link Party}
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     */
    assignee: {
      type: ObjectId,
      ref: 'Party',
      index: true,
      exists: { refresh: true }
    },

    /**
     * @name reporter
     * @description A civilian(customer etc) who reported a
     * service request(issue)
     *
     * @type {object}
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     */
    reporter: Reporter,

    /**
     * @name method
     * @description A communication(contact) method(mechanism) used by a reporter
     *              to report the issue
     * @type {object}
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     */
    method: ContactMethod,

    /**
     * @name ttr
     * @description A time taken to resolve the issue(service request) in duration format.
     *
     *              Used to calculate Mean Time To Resolve(MTTR) KPI.
     *
     *              It calculated as time taken since the issue reported to the
     *              time when issue resolved.
     *
     * @type {DurationSchema}
     * @see {@link DurationSchema}
     * @since 0.1.0
     * @version 0.1.0
     * @see {@link http://www.thinkhdi.com/~/media/HDICorp/Files/Library-Archive/Insider%20Articles/mean-time-to-resolve.pdf}
     * @instance
     */
    ttr: Duration,

    /**
     * @name call
     * @description log operator call details at a call center
     *
     * @type {CallSchema}
     * @see {@link CallSchema}
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     */
    call: Call,

    /**
     * @name attachments
     * @description Associated file(s) with service request(issue)
     * @type {Array}
     * @see {@link MediaSchema}
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     */
    attachments: {
      type: [Media],
      index: true,
    },

    /**
     * @name code
     * @description A unique human readable identifier of the
     * service request(issue).
     *
     * It refer to a ticket number.
     *
     * It mainly used by reporter to query for status and
     * progress of the reported issue.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} required - mark as required
     * @property {boolean} uppercase - force uppercasing
     * @property {boolean} unique - ensure uniqueness
     * @property {boolean} searchable - allow for searching
     * @property {object} fake - fake data generator options
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     */
    code: {
      type: String,
      trim: true,
      required: true,
      uppercase: true,
      unique: true,
      searchable: true,
      fake: {
        generator: 'finance',
        type: 'account',
      },
    },

    /**
     * @name description
     * @description A detailed human readable explanation about the
     * service request(issue)
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {object} fake - fake data generator options
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     */
    description: {
      type: String,
      trim: true,
      // required: true,
      index: true,
      searchable: true,
      fake: {
        generator: 'lorem',
        type: 'paragraph',
      },
    },

    /**
     * @name address
     * @description A human entered address or description of location
     * where service request(issue) happened.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {object} fake - fake data generator options
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     */
    address: {
      type: String,
      trim: true,
      // required: true,
      index: true,
      searchable: true,
      fake: {
        generator: 'address',
        type: 'streetAddress',
      },
    },

    /**
     * @name location
     * @description A geo point of where service request(issue) happened.
     *
     * @type {object}
     *
     * @since  0.1.0
     * @version  0.1.0
     * @instance
     */
    location: Point,

    /**
     * @name expectedAt
     * @description A time when the issue is expected to be resolved.
     *
     *              Computed by adding expected hours to resolve issue to the
     *              reporting time of the issue i.e (createdAt + service.sla.ttr in hours).
     *
     * @type {Object}
     * @property {object} type - schema(data) type
     * @property {boolean} index - ensure database index
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     */
    expectedAt: {
      type: Date,
      index: true,
    },

    /**
     * @name resolvedAt
     * @description A time when the issue was resolved
     * @type {Object}
     * @property {object} type - schema(data) type
     * @property {boolean} index - ensure database index
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     */
    resolvedAt: {
      type: Date,
      index: true,
    },
  },
  SCHEMA_OPTIONS
);

/*
 * -----------------------------------------------------------------------------
 *  Virtuals
 * -----------------------------------------------------------------------------
 */

// TODO remove jshint ignore once migrated to eslint
/* jshint ignore:start */

/**
 * @name longitude
 * @description obtain service request(issue) longitude
 * @type {Number}
 * @since 0.1.0
 * @version 0.1.0
 */
ServiceRequestSchema.virtual('longitude').get(function() {
  return this.location && this.location.coordinates
    ? this.location.coordinates[0]
    : 0;
});

/**
 * @name latitude
 * @description obtain service request(issue) latitude
 * @type {Number}
 * @since 0.1.0
 * @version 0.1.0
 */
ServiceRequestSchema.virtual('latitude').get(function() {
  return this.location && this.location.coordinates
    ? this.location.coordinates[1]
    : 0;
});
/* jshint ignore:end */

/*
 * -----------------------------------------------------------------------------
 *  Instances
 * -----------------------------------------------------------------------------
 */

/**
 * @name mapToLegacy
 * @description map service request to legacy data structure
 * @param {Function} done  a callback to invoke on success or failure
 * @since  0.1.0
 * @version 0.1.0
 * @public
 * @type {Function}
 */
ServiceRequestSchema.methods.mapToLegacy = function mapToLegacy() {
  const servicerequest = this;
  const object = this.toObject();
  if (servicerequest.group) {
    object.group.name = servicerequest.group.name.en;
  }
  if (servicerequest.service) {
    const Service = mongoose.model('Service');
    const service = Service.mapToLegacy(servicerequest.service);
    object.service = _.pick(service, [
      '_id',
      'code',
      'name',
      'color',
      'group',
      'isExternal',
    ]);
  }
  if (servicerequest.priority) {
    object.priority.name = servicerequest.priority.name.en;
  }
  if (servicerequest.status) {
    object.status.name = servicerequest.status.name.en;
  }
  object.changelogs = _.map(servicerequest.changelogs, function(changelog) {
    const _changelog = changelog.toObject();
    if (changelog.priority) {
      _changelog.priority.name = changelog.priority.name.en;
    }
    if (changelog.status) {
      _changelog.status.name = changelog.status.name.en;
    }
    return _changelog;
  });
  return object;
};

/**
 * @name syncDownstream
 * @description sync service request to local(downstream) server
 * @param {Function} done  a callback to invoke on success or failure
 * @since  0.1.0
 * @version 0.1.0
 * @public
 * @type {Function}
 */
ServiceRequestSchema.methods.syncDownstream = function(done) {
  // obtain sync configurations
  const options = getBoolean('SYNC_DOWNSTREAM_ENABLE', false);

  //check if service isExternal
  // const isExternal = (this.service && this.service.isExternal);

  //check if downstream syncing is enabled
  const isEnabled =
    options.enabled && !_.isEmpty(options.baseUrl) && !_.isEmpty(options.token);

  //sync down stream
  if (isEnabled) {
    sync.baseUrl = options.baseUrl;
    sync.token = options.token;
    sync.post(this.toObject(), done);
  }

  //no downstream sync back-off
  else {
    done(null, this);
  }
};

/**
 * @name syncUpstream
 * @description sync service request to public(upstream) server
 * @param {Function} done  a callback to invoke on success or failure
 * @since  0.1.0
 * @version 0.1.0
 * @public
 * @type {Function}
 */
ServiceRequestSchema.methods.syncUpstream = function(done) {
  // obtain sync configurations
  const SYNC_UPSTREAM_ENABLED = getBoolean('SYNC_UPSTREAM_ENABLED', false);
  const SYNC_UPSTREAM_BASE_URL = getString('SYNC_UPSTREAM_BASE_URL', '');
  const SYNC_UPSTREAM_TOKEN = getString('SYNC_UPSTREAM_TOKEN', '');
  //check if service isExternal
  const isExternal = this.service && this.service.isExternal;

  //check if upstream syncing is enabled
  const isEnabled =
    SYNC_UPSTREAM_ENABLED &&
    !_.isEmpty(SYNC_UPSTREAM_BASE_URL) &&
    !_.isEmpty(SYNC_UPSTREAM_TOKEN) &&
    isExternal;

  //sync up stream
  if (isEnabled) {
    sync.baseUrl = SYNC_UPSTREAM_BASE_URL;
    sync.token = SYNC_UPSTREAM_TOKEN;
    const toSync = _.merge({}, this.toObject());
    delete toSync.changelogs; //TODO sync public changelogs
    delete toSync.attachments; //TODO sync attachement
    sync.patch(toSync, done);
  }

  //no upstream sync back-off
  else {
    done(null, this);
  }
};

/**
 * @name sync
 * @description try sync service request either to public(upstream) or
 *              local(downstream) server
 * @param {Function} [done]  a callback to invoke on success or failure
 * @since  0.1.0
 * @version 0.1.0
 * @public
 * @type {Function}
 */
ServiceRequestSchema.methods.sync = function(strategy, done) {
  //ensure callback
  done = done || function() {};

  //obtain sync strategies
  const SYNC_STRATEGIES_DOWNSTREAM = getString(
    'SYNC_STRATEGIES_DOWNSTREAM',
    'DOWNSTREAM'
  );
  const SYNC_STRATEGIES_UPSTREAM = getString(
    'SYNC_STRATEGIES_UPSTREAM',
    'UPSTREAM'
  );

  const SYNC_UPSTREAM_ENABLED = getBoolean('SYNC_UPSTREAM_ENABLED', false);
  const SYNC_UPSTREAM_BASE_URL = getString('SYNC_UPSTREAM_BASE_URL', '');
  const SYNC_UPSTREAM_TOKEN = getString('SYNC_UPSTREAM_TOKEN', '');

  const SYNC_DOWNSTREAM_ENABLED = getBoolean('SYNC_DOWNSTREAM_ENABLED', false);
  const SYNC_DOWNSTREAM_BASE_URL = getString('SYNC_DOWNSTREAM_BASE_URL', '');
  const SYNC_DOWNSTREAM_TOKEN = getString('SYNC_DOWNSTREAM_TOKEN', '');

  // check if downstream sync enable
  let isEnabled =
    SYNC_DOWNSTREAM_ENABLED &&
    !_.isEmpty(SYNC_DOWNSTREAM_BASE_URL) &&
    !_.isEmpty(SYNC_DOWNSTREAM_TOKEN);

  if (strategy === SYNC_STRATEGIES_DOWNSTREAM) {
    //sync downstream
    if (isEnabled) {
      //queue & run in background in production
      if (isProduction && this.runInBackground) {
        this.runInBackground({ method: 'syncDownstream' });
      }

      //run synchronous in dev & test environment
      else {
        this.syncDownstream(done);
      }
    }
  }

  // check if upstream sync enable
  isEnabled =
    SYNC_UPSTREAM_ENABLED &&
    !_.isEmpty(SYNC_UPSTREAM_BASE_URL) &&
    !_.isEmpty(SYNC_UPSTREAM_TOKEN);

  if (strategy === SYNC_STRATEGIES_UPSTREAM) {
    //sync upstream
    if (isEnabled) {
      //queue & run in background in production
      if (isProduction && this.runInBackground) {
        this.runInBackground({ method: 'syncUpstream' });
      }

      //run synchronous in dev & test environment
      else {
        this.syncUpstream(done);
      }
    }
  }
};

/*
 * -----------------------------------------------------------------------------
 * Hooks
 * -----------------------------------------------------------------------------
 */

/**
 * @name preValidate
 * @function preValidate
 * @description pre validation logics for service request
 * @param {Function} next a callback to be called after pre validation logics
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
ServiceRequestSchema.pre('validate', function _preValidate(next) {
  this.preValidate(next);
});

/* Instance */

/**
 * @name beforeDelete
 * @function beforeDelete
 * @description pre delete servicerequest logics
 * @param  {Function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 */
ServiceRequestSchema.methods.beforeDelete = function beforeDelete(done) {
  //TODO prevent delete if ...
  done();
};

/**
 * @name afterPost
 * @function afterPost
 * @description post save servicerequest logics
 * @param  {Function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 */
ServiceRequestSchema.methods.afterPost = function afterPost(done) {
  done();
};

/*
 * -----------------------------------------------------------------------------
 * Statics
 * -----------------------------------------------------------------------------
 */

/* expose static constants */
ServiceRequestSchema.statics.MODEL_NAME = SERVICEREQUEST_MODEL_NAME;
ServiceRequestSchema.statics.OPTION_AUTOPOPULATE = OPTION_AUTOPOPULATE;
ServiceRequestSchema.statics.OPTION_AUTOPOPULATES = OPTION_AUTOPOPULATES;
//contact methods constants
ServiceRequestSchema.statics.CONTACT_METHOD_PHONE_CALL =
  ContactMethod.PHONE_CALL;
ServiceRequestSchema.statics.CONTACT_METHOD_FAX = ContactMethod.FAX;
ServiceRequestSchema.statics.CONTACT_METHOD_LETTER = ContactMethod.LETTER;
ServiceRequestSchema.statics.CONTACT_METHOD_VISIT = ContactMethod.VISIT;
ServiceRequestSchema.statics.CONTACT_METHOD_SMS = ContactMethod.SMS;
ServiceRequestSchema.statics.CONTACT_METHOD_USSD = ContactMethod.USSD;
ServiceRequestSchema.statics.CONTACT_METHOD_EMAIL = ContactMethod.EMAIL;
ServiceRequestSchema.statics.CONTACT_METHOD_MOBILE_APP =
  ContactMethod.MOBILE_APP;
ServiceRequestSchema.statics.CONTACT_METHODS = ContactMethod.METHODS;

/**
 * @name countResolved
 * @description count resolved issues so far
 * @param  {Function} done a callback to be invoked on success or failure
 * @since 0.1.0
 * @version 0.1.0
 * @public
 * @type {Function}
 */
ServiceRequestSchema.statics.countResolved = function(done) {
  //TODO move to aggregation framework to support more operations

  //refs
  const ServiceRequest = mongoose.model('ServiceRequest');

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
ServiceRequestSchema.statics.countUnResolved = function(done) {
  //TODO move to aggregation framework to support more operations

  //refs
  const ServiceRequest = mongoose.model('ServiceRequest');

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
ServiceRequestSchema.statics.countPerJurisdiction = function(done) {
  //refs
  const ServiceRequest = mongoose.model('ServiceRequest');

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
ServiceRequestSchema.statics.countPerMethod = function(done) {
  //refs
  const ServiceRequest = mongoose.model('ServiceRequest');

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
ServiceRequestSchema.statics.countPerGroup = function(done) {
  //refs
  const ServiceRequest = mongoose.model('ServiceRequest');

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
ServiceRequestSchema.statics.countPerService = function(done) {
  //refs
  const ServiceRequest = mongoose.model('ServiceRequest');

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
ServiceRequestSchema.statics.countPerOperator = function(done) {
  //refs
  const ServiceRequest = mongoose.model('ServiceRequest');

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
ServiceRequestSchema.statics.countPerStatus = function(done) {
  //refs
  const ServiceRequest = mongoose.model('ServiceRequest');

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
ServiceRequestSchema.statics.countPerPriority = function(done) {
  //refs
  const ServiceRequest = mongoose.model('ServiceRequest');

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
ServiceRequestSchema.statics.calculateAverageCallDuration = function(done) {
  //refs
  const ServiceRequest = mongoose.model('ServiceRequest');

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
ServiceRequestSchema.statics.standings = function(criteria, done) {
  //normalize arguments
  if (_.isFunction(criteria)) {
    done = criteria;
    criteria = {};
  }

  //refs
  const ServiceRequest = mongoose.model('ServiceRequest');

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
ServiceRequestSchema.statics.overviews = function(done) {
  //refs
  const ServiceRequest = mongoose.model('ServiceRequest');

  //TODO make use of https://docs.mongodb.com/v3.4/reference/operator/aggregation/facet/

  async.parallel(
    {
      //total, resolved, un-resolved count & average call duration
      issues: function(next) {
        async.parallel(
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
ServiceRequestSchema.statics.summary = function(criteria, done) {
  //normalize arguments
  if (_.isFunction(criteria)) {
    done = criteria;
    criteria = {};
  }
  criteria = _.merge({}, _.pick(criteria, 'jurisdiction')); //clone criteria

  //references
  const Service = mongoose.model('Service');
  const Status = mongoose.model('Status');
  const Jurisdiction = mongoose.model('Jurisdiction');
  const Priority = mongoose.model('Priority');
  const ServiceRequest = mongoose.model('ServiceRequest');

  //TODO use aggregation
  async.parallel(
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
              async.parallel(works, next);
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
            async.parallel(works, next);
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
            async.parallel(works, next);
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
            async.parallel(works, next);
          }
        });
      },
    },
    function(error, results) {
      done(error, results);
    }
  );
};

/**
 * @name getPhones
 * @function getPhones
 * @description pull distinct service request reporter phones
 * @param {Object} [criteria] valid query criteria
 * @param {function} done a callback to invoke on success or error
 * @return {String[]|Error}
 * @since 0.1.0
 * @version 0.1.0
 * @static
 */
ServiceRequestSchema.statics.getPhones = function getPhones(criteria, done) {
  //refs
  const ServiceRequest = this;

  //normalize arguments
  const _criteria = _.isFunction(criteria) ? {} : _.merge({}, criteria);
  const _done = _.isFunction(criteria) ? criteria : done;

  ServiceRequest.find(_criteria)
    .distinct('reporter.phone')
    .exec(function onGetPhones(error, phones) {
      if (!error) {
        phones = _.uniq(_.compact([].concat(phones)));
      }
      return _done(error, phones);
    });
};

/*
 * -----------------------------------------------------------------------------
 * Plugins
 * -----------------------------------------------------------------------------
 */

ServiceRequestSchema.plugin(preValidate);
ServiceRequestSchema.plugin(actions);
ServiceRequestSchema.plugin(notification);
ServiceRequestSchema.plugin(aggregated);
ServiceRequestSchema.plugin(open311);
ServiceRequestSchema.plugin(overview);
ServiceRequestSchema.plugin(performancePlugin);
ServiceRequestSchema.plugin(pipeline);
ServiceRequestSchema.plugin(work);
ServiceRequestSchema.plugin(duration);
// ServiceRequestSchema.plugin(changelog);

/* export servicerequest model */
module.exports = mongoose.model(MODEL_NAME, ServiceRequestSchema);

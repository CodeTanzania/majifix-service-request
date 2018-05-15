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
const actions = require('mongoose-rest-actions');
const { Point } = require('mongoose-geojson-schemas');
const { Jurisdiction } = require('majifix-jurisdiction');
const { ServiceGroup } = require('majifix-service-group');
const { Priority } = require('majifix-priority');
const { Status } = require('majifix-status');
const { Service } = require('majifix-service');
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
    location: 1
  },
  maxDepth: AUTOPOPULATE_MAX_DEPTH
};

const SCHEMA_OPTIONS = ({ timestamps: true, emitIndexErrors: true });


/* ref population options */
const JURISDICTION_AUTOPOPULATE = _.merge({},
  Jurisdiction.OPTION_AUTOPOPULATE,
  ({ path: 'jurisdiction', maxDepth: AUTOPOPULATE_MAX_DEPTH })
);

const SERVICEGROUP_AUTOPOPULATE = _.merge({},
  ServiceGroup.OPTION_AUTOPOPULATE,
  ({ path: 'group', maxDepth: AUTOPOPULATE_MAX_DEPTH })
);

const SERVICE_AUTOPOPULATE = _.merge({},
  Service.OPTION_AUTOPOPULATE,
  ({ path: 'service', maxDepth: AUTOPOPULATE_MAX_DEPTH })
);

const PRIORITY_AUTOPOPULATE = _.merge({},
  Priority.OPTION_AUTOPOPULATE,
  ({ path: 'priority', maxDepth: AUTOPOPULATE_MAX_DEPTH })
);

const STATUS_AUTOPOPULATE = _.merge({},
  Status.OPTION_AUTOPOPULATE,
  ({ path: 'status', maxDepth: AUTOPOPULATE_MAX_DEPTH })
);

const OPTION_AUTOPOPULATES = [];


/* declarations */
const schemaPath = path.join(__dirname, 'schemas');
const Reporter = require(path.join(schemaPath, 'reporter.schema'));
const ContactMethod = require(path.join(schemaPath, 'contactmethod.schema'));
const Duration = require(path.join(schemaPath, 'duration.schema'));
const Call = require(path.join(schemaPath, 'call.schema'));
const Media = require(path.join(schemaPath, 'media.schema'));
const ChangeLog = require(path.join(schemaPath, 'changelog.schema'));

/**
 * @name ServiceRequestSchema
 * @type {Schema}
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
const ServiceRequestSchema = new Schema({

  /**
   * @name jurisdiction
   * @description A jurisdiction responsible in handling service
   * request(issue)
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {string} ref - referenced collection
   * @property {boolean} required - mark required
   * @property {boolean} autoset - allow to set id from full object
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
    autoset: true,
    exists: true,
    autopopulate: JURISDICTION_AUTOPOPULATE,
    index: true
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
   * @property {boolean} autoset - allow to set id from full object
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
    autoset: true,
    exists: true,
    autopopulate: SERVICEGROUP_AUTOPOPULATE,
    index: true
  },


  /**
   * @name service
   * @description A service under which request(issue) belongs to
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {string} ref - referenced collection
   * @property {boolean} required - mark required
   * @property {boolean} autoset - allow to set id from full object
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
    autoset: true,
    exists: true,
    autopopulate: SERVICE_AUTOPOPULATE,
    index: true
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
   * @property {boolean} autoset - allow to set id from full object
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
    autoset: true,
    exists: true,
    autopopulate: PRIORITY_AUTOPOPULATE,
    index: true
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
   * @property {boolean} autoset - allow to set id from full object
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
    autoset: true,
    exists: true,
    autopopulate: STATUS_AUTOPOPULATE,
    index: true
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
   * @property {boolean} autoset - allow to set id from full object
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
    autoset: true,
    exists: true
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
   * @property {boolean} autoset - allow to set id from full object
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
    autoset: true,
    exists: true,
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
    index: true
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
      type: 'account'
    }
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
      type: 'paragraph'
    }
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
      type: 'streetAddress'
    }
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
    index: true
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
    index: true
  },


  /**
   * @name changelogs
   * @description Associated change(s) on service request(issue)
   * @type {Array}
   * @see {@link ChangeLogSchema}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  changelogs: [ChangeLog]

}, SCHEMA_OPTIONS);



//Indexes



//Hooks

ServiceRequestSchema.pre('validate', function (next) {

  next();

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


/* Statics */

/* expose static constants */
ServiceRequestSchema.statics.MODEL_NAME = MODEL_NAME;
ServiceRequestSchema.statics.OPTION_AUTOPOPULATE = OPTION_AUTOPOPULATE;
ServiceRequestSchema.statics.OPTION_AUTOPOPULATES = OPTION_AUTOPOPULATES;


/* Plugins */

/* use mongoose rest actions*/
ServiceRequestSchema.plugin(actions);


/* export servicerequest model */
module.exports = mongoose.model(MODEL_NAME, ServiceRequestSchema);
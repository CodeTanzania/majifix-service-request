'use strict';


/**
 * @module ChangeLog
 * @name ChangeLog
 * @description A record(log) of a changes on a service request(issue).
 *
 *              It may be status change, priority change, assignee change,
 *              private comment(internal note) or public comment etc.
 *
 * @see {@link ServiceRequest}
 * @see {@link Status}
 * @see {@link Party}
 * @see {@link Priority}
 * @author lally elias <lallyelias87@mail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */


/* dependencies */
const { Status } = require('majifix-status');
const { Priority } = require('majifix-priority');
const { Schema } = require('mongoose');
const ObjectId = Schema.Types.ObjectId;


/* constants  */
const VISIBILITY_PUBLIC = 'Public';
const VISIBILITY_PRIVATE = 'Private';
const VISIBILITIES = [VISIBILITY_PRIVATE, VISIBILITY_PUBLIC];
const SCHEMA_OPTIONS = ({ timestamps: true, emitIndexErrors: true });

//TODO hook on service request pre validation
//TODO hook on service request pre save
//TODO hook on service request post save
//TODO ensure notification is sent once there are changes
//TODO always sort them in order of update before send them
//TODO notify assignee once changed(previous and current)
//TODO support attachment changelog(audio, images etc)

/**
 * @name ChangeLogSchema
 * @type {Schema}
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
const ChangeLogSchema = new Schema({


  /**
   * @name status
   * @description A current assigned status of the service request.
   *
   * @type {object}
   * @property {object} type - Schema(data) type
   * @property {string} ref - referenced collection
   * @property {boolean} autoset - allow to set id from full object
   * @property {boolean} exists - ensure ref exists before save
   * @property {object} autopopulate - status population options
   * @property {boolean} index - ensure database index
   * @see {@link Status}
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  status: {
    type: ObjectId,
    ref: Status.MODEL_NAME,
    index: true,
    autoset: true,
    exists: true,
    autopopulate: Status.OPTION_AUTOPOPULATE
  },


  /**
   * @name priority
   * @description A current assigned priority of the service request
   *
   * @type {object}
   * @property {object} type - Schema(data) type
   * @property {string} ref - referenced collection
   * @property {boolean} autoset - allow to set id from full object
   * @property {boolean} exists - ensure ref exists before save
   * @property {object} autopopulate - priority population options
   * @property {boolean} index - ensure database index
   * @see {@link Priority}
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  priority: {
    type: ObjectId,
    ref: Priority.MODEL_NAME,
    index: true,
    autoset: true,
    exists: true,
    autopopulate: Priority.OPTION_AUTOPOPULATE
  },


  /**
   * @name assignee
   * @description A current assigned party to work on service request(issue)
   *
   * @type {object}
   * @property {object} type - Schema(data) type
   * @property {string} ref - referenced collection
   * @property {boolean} autoset - allow to set id from full object
   * @property {boolean} exists - ensure ref exists before save
   * @property {boolean} index - ensure database index
   * @see {@link Priority}
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  assignee: {
    type: ObjectId,
    ref: 'Party',
    index: true,
    autoset: true,
    exists: true
  },


  /**
   * @name changer
   * @description A party whose made changes to a service request(issue)
   *
   * @type {object}
   * @property {object} type - Schema(data) type
   * @property {string} ref - referenced collection
   * @property {boolean} autoset - allow to set id from full object
   * @property {boolean} exists - ensure ref exists before save
   * @property {boolean} index - ensure database index
   * @see {@link Party}
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  changer: {
    type: ObjectId,
    ref: 'Party',
    index: true,
    autoset: true,
    exists: true
  },


  /**
   * @name comment
   * @description A note provided by a change when changing a status.
   *
   *              It may be an internal note telling how far the service
   *              request(issue) has been worked on or a message to a reporter.
   *
   * @type {object}
   * @property {object} type - Schema(data) type
   * @property {boolean} trim - ensure trimming
   * @property {boolean} searchable - allow for searching
   * @property {boolean} index - ensure database index
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  comment: {
    type: String,
    index: true,
    trim: true,
    searchable: true
  },


  /**
   * @name shouldNotify
   * @description Signal to send notification to a service request(issue)
   *              reporter using sms, email etc. about work(progress) done
   *              so far to resolve the issue.
   *
   * @type {object}
   * @property {object} type - Schema(data) type
   * @property {boolean} default - default value
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  shouldNotify: {
    type: Boolean,
    default: false
  },


  /**
   * @name wasNotificationSent
   * @description Tells if a notification contain a changes was
   *              sent to a service request(issue) reporter using
   *              sms, email etc. once a service request changed.
   *
   *              Note!: status changes trigger a notification to be sent
   *              always.
   *
   * @type {object}
   * @property {object} type - Schema(data) type
   * @property {boolean} default - default value
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  wasNotificationSent: {
    type: Boolean,
    default: false
  },


  /**
   * @name visibility
   * @description Signal if this changelog is public or private viewable.
   *
   *              Note!: status changes are always public viewable by default.
   *
   * @type {object}
   * @property {object} type - Schema(data) type
   * @property {string} default - default value
    it('should have wasNotificationSent field');
   * @property {array} enum - list of acceptable values
   * @property {boolean} index - ensure database index
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  visibility: {
    type: String,
    index: true,
    enum: VISIBILITIES,
    default: VISIBILITY_PRIVATE
  }

}, SCHEMA_OPTIONS);


//---------------------------------------------------------
// ChangeLogSchema Hooks
//---------------------------------------------------------


/**
 * @name  preValidate
 * @description pre validation logics for changelog
 * @param  {Function} next a callback to be called after pre validation logics
 * @since  0.1.0
 * @version 0.1.0
 * @private
 */
ChangeLogSchema.pre('validate', function (next) {

  //always make status change to trigger notification
  //and public viewable
  if (this.status) {
    this.shouldNotify = true;
    this.visibility = VISIBILITY_PUBLIC;
  }

  //continue
  next();

});


/**
 * @name isPublic
 * @description check if current change log is public visible
 * @type {Boolean}
 * @since 0.1.0
 * @version 0.1.0
 */
ChangeLogSchema.virtual('isPublic').get(function () {
  const isPublic = (this.visibility === VISIBILITY_PRIVATE ? false : true);
  return isPublic;
});


//---------------------------------------------------------
// ChangeLogSchema Statics
//---------------------------------------------------------

//expose changelog visibility flags(constants)
ChangeLogSchema.VISIBILITY_PRIVATE =
  ChangeLogSchema.statics.VISIBILITY_PRIVATE = VISIBILITY_PRIVATE;

ChangeLogSchema.VISIBILITY_PUBLIC =
  ChangeLogSchema.statics.VISIBILITY_PUBLIC = VISIBILITY_PUBLIC;

ChangeLogSchema.VISIBILITIES =
  ChangeLogSchema.statics.VISIBILITIES = VISIBILITIES;


//TODO post save send notification
//TODO for public comment notify reporter
//TODO do not notify private changes(?)


/**
 * @name ChangeLogSchema
 * @description exports changelog schema
 * @type {Schema}
 * @since  0.1.0
 * @version 0.1.0
 * @public
 */
module.exports = exports = ChangeLogSchema;

'use strict';


/**
 * @module Duration
 * @description duration schema used to express time(milliseconds) in their
 *              discrete formats i.e years, months, days, minutes, seconds,
 *              milliseconds etc.
 * @author lally elias<lallyelias87@gmail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @public
 */


/* dependencies */
const { Schema } = require('mongoose');
const parseMs = require('parse-ms');
const prettyMs = require('pretty-ms');

/* declaration */
const SCHEMA_OPTIONS = ({ _id: false, timestamps: false });


/**
 * @name DurationSchema
 * @description duration schema
 * @type {Schema}
 * @since  0.1.0
 * @version 0.1.0
 * @private
 */
const DurationSchema = new Schema({
  /**
   * @name years
   * @description duration in years
   *
   * @type {object}
   * @property {object} type - Schema(data) type
   * @property {Number} default - default value
   * @property {boolean} index - ensure database index
   * @since  0.1.0
   * @version 0.1.0
   */
  years: {
    type: Number,
    default: 0,
    index: true
  },


  /**
   * @name months
   * @description duration in months
   *
   * @type {object}
   * @property {object} type - Schema(data) type
   * @property {Number} default - default value
   * @property {boolean} index - ensure database index
   * @since  0.1.0
   * @version 0.1.0
   */
  months: {
    type: Number,
    default: 0,
    index: true
  },


  /**
   * @name days
   * @description duration in days
   *
   * @type {object}
   * @property {object} type - Schema(data) type
   * @property {Number} default - default value
   * @property {boolean} index - ensure database index
   * @since  0.1.0
   * @version 0.1.0
   */
  days: {
    type: Number,
    default: 0,
    index: true
  },


  /**
   * @name hours
   * @description duration in hours
   *
   * @type {object}
   * @property {object} type - Schema(data) type
   * @property {Number} default - default value
   * @property {boolean} index - ensure database index
   * @since  0.1.0
   * @version 0.1.0
   */
  hours: {
    type: Number,
    default: 0,
    index: true
  },


  /**
   * @name minutes
   * @description duration in minutes
   *
   * @type {object}
   * @property {object} type - Schema(data) type
   * @property {Number} default - default value
   * @property {boolean} index - ensure database index
   * @since  0.1.0
   * @version 0.1.0
   */
  minutes: {
    type: Number,
    default: 0,
    index: true
  },


  /**
   * @name seconds
   * @description duration in seconds
   *
   * @type {object}
   * @property {object} type - Schema(data) type
   * @property {Number} default - default value
   * @property {boolean} index - ensure database index
   * @since  0.1.0
   * @version 0.1.0
   */
  seconds: {
    type: Number,
    default: 0,
    index: true
  },


  /**
   * @name milliseconds
   * @description duration in milliseconds
   *
   * @type {object}
   * @property {object} type - Schema(data) type
   * @property {boolean} required - mark as required
   * @property {boolean} index - ensure database index
   * @since  0.1.0
   * @version 0.1.0
   */
  milliseconds: {
    type: Number,
    required: true,
    index: true
  },


  /**
   * @name human
   * @description duration in human readable format like 4d 2h 30s
   *
   * @type {object}
   * @property {object} type - Schema(data) type
   * @property {string} required - mark as required
   * @property {boolean} trim - force trimming
   * @since  0.1.0
   * @version 0.1.0
   */
  human: {
    type: String,
    required: true,
    trim: true
  }

}, SCHEMA_OPTIONS);


//---------------------------------------------------------
// DurationSchema Hooks
//---------------------------------------------------------


/**
 * @name  preValidate
 * @description pre validation logics for duration
 * @param  {Function} next a callback to be called after pre validation logics
 * @since  0.1.0
 * @version 0.1.0
 * @private
 */
DurationSchema.pre('validate', function (next) {

  //convert millisecond to other parts
  try {

    //there is milliseconds
    if (this.milliseconds) {

      //always parse milliseconds to human readable format
      this.human =
        prettyMs(this.milliseconds || 0, { secDecimalDigits: 0 });

      //always parse milliseconds to respective parts
      const parsedMs = parseMs(this.milliseconds || 0);

      //TODO years
      //TODO months

      //set parts
      this.days = parsedMs.days;
      this.hours = parsedMs.hours;
      this.minutes = parsedMs.minutes;
      this.seconds = parsedMs.seconds;

      //continue to validations
      next(null, this);

    }

    //no milliseconds provided continue with validations
    else {
      next(null, this);
    }

  }

  //catch all errors and back-off
  catch (error) {
    next(error);
  }

});

/* export Duration Schema  */
module.exports = exports = DurationSchema;

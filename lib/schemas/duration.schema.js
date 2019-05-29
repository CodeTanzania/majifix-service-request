'use strict';

/* dependencies */
const { createSubSchema } = require('@lykmapipo/mongoose-common');
const parseMs = require('parse-ms');
const prettyMs = require('pretty-ms');

/**
 * @function parseDuration
 * @name parseDuration
 * @description Parse duration into its discrete formats i.e
 * years, months, days, minutes, seconds, milliseconds etc.
 *
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 * @static
 * @example
 *
 * const parsed = parseDuration({milliseconds: 1000});
 * //=> {days: ..., hours: ..., ...};
 *
 */
const parseDuration = (duration, done) => {
  // try parse and normalize
  try {

    // ensure milliseconds
    if (duration.milliseconds) {
      // parse milliseconds to human readable format
      duration.human =
        prettyMs(duration.milliseconds || 0, { secDecimalDigits: 0 });

      // parse milliseconds to its parts
      const parsedMs = parseMs(duration.milliseconds || 0);

      //TODO years
      //TODO months

      // set parts
      duration.days = parsedMs.days;
      duration.hours = parsedMs.hours;
      duration.minutes = parsedMs.minutes;
      duration.seconds = parsedMs.seconds;

      // continue
      done(null, duration);
    }

    // no milliseconds provided continue
    else {
      done(null, duration);
    }
  }
  // catch all errors and back-off
  catch (error) {
    done(error);
  }
};

/**
 * @module Duration
 * @name Duration
 * @type {Schema}
 * @description Express time(milliseconds) in their discrete formats i.e
 * years, months, days, minutes, seconds, milliseconds etc.
 *
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 *
 */
const Duration = createSubSchema({
  /**
   * @name years
   * @description duration in years
   *
   * @type {object}
   * @property {object} type - Schema(data) type
   * @property {Number} default - default value
   * @property {boolean} index - ensure database index
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  years: {
    type: Number,
    default: 0,
    index: true,
  },

  /**
   * @name months
   * @description duration in months
   *
   * @type {object}
   * @property {object} type - Schema(data) type
   * @property {Number} default - default value
   * @property {boolean} index - ensure database index
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  months: {
    type: Number,
    default: 0,
    index: true,
  },

  /**
   * @name days
   * @description duration in days
   *
   * @type {object}
   * @property {object} type - Schema(data) type
   * @property {Number} default - default value
   * @property {boolean} index - ensure database index
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  days: {
    type: Number,
    default: 0,
    index: true,
  },

  /**
   * @name hours
   * @description duration in hours
   *
   * @type {object}
   * @property {object} type - Schema(data) type
   * @property {Number} default - default value
   * @property {boolean} index - ensure database index
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  hours: {
    type: Number,
    default: 0,
    index: true,
  },

  /**
   * @name minutes
   * @description duration in minutes
   *
   * @type {object}
   * @property {object} type - Schema(data) type
   * @property {Number} default - default value
   * @property {boolean} index - ensure database index
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  minutes: {
    type: Number,
    default: 0,
    index: true,
  },

  /**
   * @name seconds
   * @description duration in seconds
   *
   * @type {object}
   * @property {object} type - Schema(data) type
   * @property {Number} default - default value
   * @property {boolean} index - ensure database index
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  seconds: {
    type: Number,
    default: 0,
    index: true,
  },

  /**
   * @name milliseconds
   * @description duration in milliseconds
   *
   * @type {object}
   * @property {object} type - Schema(data) type
   * @property {boolean} required - mark as required
   * @property {boolean} index - ensure database index
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  milliseconds: {
    type: Number,
    required: true,
    index: true,
  },

  /**
   * @name human
   * @description duration in human readable format like 4d 2h 30s
   *
   * @type {object}
   * @property {object} type - Schema(data) type
   * @property {string} required - mark as required
   * @property {boolean} trim - force trimming
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  human: {
    type: String,
    required: true,
    trim: true,
  }
});

/**
 * @function preValidate
 * @name preValidate
 * @description parse duration on respective parts
 * @param {Function} next a callback to be called after pre validation logics
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
Duration.pre('validate', function preValidate(next) {
  parseDuration(this, next);
});

/* exports */
module.exports = exports = { parseDuration, Duration };

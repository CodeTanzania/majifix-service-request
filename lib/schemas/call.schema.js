'use strict';

/* dependencies */
const { createSubSchema } = require('@lykmapipo/mongoose-common');
const { Duration } = require(`${__dirname}/duration.schema`);

/**
 * @function callDurationOf
 * @name callDurationOf
 * @description Derive call duration in milliseconds
 *
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 * @static
 * @example
 *
 * const time =
 *   callDurationOf({ startedAt: new Date(), endedAt: new Date() });
 * //=> 0;
 *
 */
const callDurationOf = (call = {}) => {
  // ensure call times
  call.startedAt = call.startedAt || new Date();
  call.endedAt = call.endedAt || new Date();

  // compute duration
  const time = call.endedAt.getTime() - call.startedAt.getTime();
  return time;
};

/**
 * @module Call
 * @name Call
 * @description Log call start and end time as well as call duration.
 *
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 *
 */
const Call = createSubSchema({
  /**
   * @name startedAt
   * @description time when a call received at the call center
   *
   * @type {object}
   * @property {object} type - Schema(data) type
   * @property {date} default - default value
   * @property {boolean} index - ensure database index
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  startedAt: {
    type: Date,
    default: new Date(),
    index: true,
  },

  /**
   * @name endedAt
   * @description time when a call center operator end the call
   * and release a reporter
   *
   * @type {object}
   * @property {object} type - Schema(data) type
   * @property {date} default - default value
   * @property {boolean} index - ensure database index
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  endedAt: {
    type: Date,
    default: new Date(),
    index: true,
  },

  /**
   * @name duration
   * @description call duration from time when call picked up to time when
   * a call released by the call center operator in duration formats.
   *
   * @type {object}
   * @property {object} type - Schema(data) type
   * @property {date} default - default value
   * @property {boolean} index - ensure database index
   * @see {@link DurationSchema}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  duration: Duration,
});

/**
 * @function preValidate
 * @name preValidate
 * @description pre validation logics for call
 * @param {Function} next a callback to be called after pre validation logics
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
Call.pre('validate', function preValidate(next) {
  // always ensure duration
  const time = callDurationOf(this);

  this.duration = { milliseconds: time };

  next(null, this);
});

/* exports */
module.exports = exports = { Call, callDurationOf };

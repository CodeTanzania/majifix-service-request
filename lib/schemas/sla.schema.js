'use strict';

/* dependencies */
const { createSubSchema } = require('@lykmapipo/mongoose-common');

/**
 * @module Sla
 * @name Sla
 * @description Service level aggreement
 *
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 *
 */
const SlaSchema = createSubSchema({
  /**
   * @name ttr
   * @description time required in hours to resolve(mark as done)
   *              an issue(service request)
   * @type {object}
   * @property {object} type - schema(data) type
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  ttr: {
    type: Number,
  },
});

/* exports */
module.exports = exports = SlaSchema;

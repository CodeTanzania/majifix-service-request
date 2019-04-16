'use strict';


/**
 * @module SLA
 * @description service level agreement schema
 * @author lally elias<lallyelias87@gmail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @public
 */


/* dependencies */
const { Schema } = require('mongoose');

/* declarations */
const SCHEMA_OPTIONS = ({ _id: false, timestamps: false });

/**
 * @name SLASchema
 * @description Service Level Agreement schema
 * @type {Schema}
 */
const SlaSchema = new Schema({
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
    type: Number
  }

}, SCHEMA_OPTIONS);

/* export SLA Schema */
module.exports = exports = SlaSchema;

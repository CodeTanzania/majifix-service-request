'use strict';


/**
 * @module Reporter
 * @name Reporter
 * @description reporter schema used to log issue(service request)
 * reporter(customer or civilian)
 * 
 * @author lally elias<lallyelias87@gmail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @public
 */


/* dependencies */
const { Schema } = require('mongoose');


/* declarations */
const SCHEMA_OPTIONS = ({ _id: false, id: false, timestamps: false });


/**
 * @name ReporterSchema
 * @type {Schema}
 * @since  0.1.0
 * @version 0.1.0
 * @private
 */
const ReporterSchema = new Schema({
  /**
   * @name name
   * @description Full name name of the reporter.
   * 
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
   * 
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  name: {
    type: String,
    trim: true,
    searchable: true,
    fake: {
      generator: 'name',
      type: 'findName'
    },
    index: true
  },


  /**
   * @name phone
   * @description A mobile phone number of the reporter.
   * 
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
   * 
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  phone: {
    type: String,
    trim: true,
    required: true,
    searchable: true,
    faker: {
      generator: 'phone',
      type: 'phoneNumber'
    },
    index: true
  },


  /**
   * @name email
   * @description An email address of the reporter.
   * 
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} lowercase - force lower-casing
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
   * 
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  email: {
    type: String,
    trim: true,
    lowercase: true,
    searchable: true,
    fake: {
      generator: 'internet',
      type: 'email'
    },
    index: true
  },


  /**
   * @name account
   * @description A jurisdiction internal associated account id of 
   * the reporter submitting the request(issue). 
   * 
   * This help a jurisdiction to link a reporter with their 
   * internal customer database if available. 
   * 
   * When account id is available a reporter will be treated as 
   * a customer and not a normal civilian.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} uppercase - force upper-casing
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
   * 
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  account: {
    type: String,
    trim: true,
    uppercase: true,
    searchable: true,
    fake: {
      generator: 'finance',
      type: 'account'
    },
    index: true
  }

}, SCHEMA_OPTIONS);


/* exports reporter schema */
module.exports = exports = ReporterSchema;
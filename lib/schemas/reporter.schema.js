'use strict';

/* dependencies */
const { createSubSchema } = require('@lykmapipo/mongoose-common');

/**
 * @module Reporter
 * @name Reporter
 * @description Details of  reporter(customer or civilian) file an
 * issue(service request)
 *
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 *
 */
const ReporterSchema = createSubSchema({
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
      type: 'findName',
    },
    index: true,
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
    index: true,
    fake: faker => faker.helpers.replaceSymbolWithNumber('255714######'),
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
    index: true,
    fake: {
      generator: 'internet',
      type: 'email',
    },
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
      type: 'account',
    },
    index: true,
  },
});

/* exports */
module.exports = exports = ReporterSchema;

'use strict';

/**
 * @module ContactMethod
 * @name ContactMethod
 * @description Representing a method used by reporter or workspace
 *              to receive(or report) service request.
 *
 *              Example a customer may call call-center and operator log
 *              the service request, then the contact method is a call and workspace
 *              is call center
 * @see {@link ServiceRequest}
 * @see {@link Party}
 * @author Benson Maruchu<benmaruchu@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */


/* dependencies */
const { Schema } = require('mongoose');

/* declarations */
const SCHEMA_OPTIONS = ({ _id: false, id: false, timestamps: false, emitIndexErrors: true });

/* constants */

/* Methods */
const PHONE_CALL = 'Call';
const EMAIL = 'Email';
const SMS = 'SMS';
const USSD = 'USSD';
const VISIT = 'Visit';
const LETTER = 'Letter';
const FAX = 'Fax';
const MOBILE_APP = 'MOBILE_APP';
const METHODS = [
  PHONE_CALL,
  EMAIL,
  SMS,
  USSD,
  VISIT,
  LETTER,
  FAX,
  MOBILE_APP,
];

/**
 * @name ContactMethod
 * @type {Schema}
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
const ContactMethodSchema = new Schema({
  /**
   * @name name
   * @description A communication(contact) method(mechanism) used by a reporter
   *              to report the issue
   *
   * @type {object}
   * @property {object} type - Schema(data) type
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {string} default - default value
   * @property {object} enum - list of acceptable values
   *
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  name: {
    type: String,
    index: true,
    searchable: true,
    default: PHONE_CALL,
    enum: METHODS
  },

  /**
   * @name workspace
   * @description workspace used be operator to receive service request
   *
   * @type {object}
   * @property {object} type - Schema(data) type
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   *
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   *
   */
  workspace: {
    type: String,
    index: true,
    searchable: true
  }
}, SCHEMA_OPTIONS);

/* Statics */

/* expose contact methods as statics */
ContactMethodSchema.PHONE_CALL =
  ContactMethodSchema.statics.PHONE_CALL = PHONE_CALL;

ContactMethodSchema.EMAIL =
  ContactMethodSchema.statics.EMAIL = EMAIL;

ContactMethodSchema.SMS =
  ContactMethodSchema.statics.SMS = SMS;

  ContactMethodSchema.USSD =
  ContactMethodSchema.statics.USSD = USSD;

ContactMethodSchema.VISIT =
  ContactMethodSchema.statics.VISIT = VISIT;

ContactMethodSchema.LETTER =
  ContactMethodSchema.statics.LETTER = LETTER;

ContactMethodSchema.FAX =
  ContactMethodSchema.statics.FAX = FAX;

ContactMethodSchema.MOBILE_APP =
  ContactMethodSchema.statics.MOBILE_APP = MOBILE_APP;

ContactMethodSchema.METHODS =
  ContactMethodSchema.statics.METHODS = METHODS;

/* export Contact Method Schema */
module.exports = exports = ContactMethodSchema;

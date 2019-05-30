'use strict';

/* dependencies */
const { createSubSchema } = require('@lykmapipo/mongoose-common');

/* constants */
const PHONE_CALL = 'Call';
const EMAIL = 'Email';
const SMS = 'SMS';
const USSD = 'USSD';
const VISIT = 'Visit';
const LETTER = 'Letter';
const FAX = 'Fax';
const MOBILE_APP = 'Mobile';
const WEBSITE = 'Website';
const METHODS = [
  PHONE_CALL, EMAIL, SMS,
  USSD, VISIT, LETTER, FAX,
  MOBILE_APP, WEBSITE
];

/**
 * @module ContactMethod
 * @name ContactMethod
 * @description Representing a method used by reporter or workspace
 * to receive(or report) service request.
 *
 * Example a customer may call call-center and operator log the service
 * request, then the contact method is a call and workspace is call center.
 *
 * @author lally elias <lallyelias87@mail.com>
 * @author Benson Maruchu<benmaruchu@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 *
 */
const ContactMethod = createSubSchema({
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
    enum: METHODS,
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
    searchable: true, //TODO provide enum and default
  },
});

/* expose contact methods as statics */
ContactMethod.PHONE_CALL = ContactMethod.statics.PHONE_CALL = PHONE_CALL;
ContactMethod.EMAIL = ContactMethod.statics.EMAIL = EMAIL;
ContactMethod.SMS = ContactMethod.statics.SMS = SMS;
ContactMethod.USSD = ContactMethod.statics.USSD = USSD;
ContactMethod.VISIT = ContactMethod.statics.VISIT = VISIT;
ContactMethod.LETTER = ContactMethod.statics.LETTER = LETTER;
ContactMethod.FAX = ContactMethod.statics.FAX = FAX;
ContactMethod.MOBILE_APP = ContactMethod.statics.MOBILE_APP = MOBILE_APP;
ContactMethod.WEBSITE = ContactMethod.statics.WEBSITE = WEBSITE;
ContactMethod.METHODS = ContactMethod.statics.METHODS = METHODS;

/* export Contact Method Schema */
module.exports = exports = ContactMethod;

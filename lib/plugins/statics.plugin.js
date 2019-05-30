'use strict';

/* dependencies */
const _ = require('lodash');
const { ContactMethod } = require(`${__dirname}/../schemas`);
const {
  MODEL_NAME,
  OPTION_AUTOPOPULATE,
} = require(`${__dirname}/../servicerequest.constants`);

/**
 * @function statics
 * @name statics
 * @description extend service request with static constants and method
 * @param {Schema} schema valid service request schema
 * @return {Function} valid mongoose schema plugin
 *
 * @author lally elias <lallyelias87@mail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @public
 *
 */
const statics = (schema /*, options*/) => {
  schema.statics.MODEL_NAME = MODEL_NAME;
  schema.statics.OPTION_AUTOPOPULATE = OPTION_AUTOPOPULATE;
  schema.statics.CONTACT_METHOD_PHONE_CALL = ContactMethod.PHONE_CALL;
  schema.statics.CONTACT_METHOD_FAX = ContactMethod.FAX;
  schema.statics.CONTACT_METHOD_LETTER = ContactMethod.LETTER;
  schema.statics.CONTACT_METHOD_VISIT = ContactMethod.VISIT;
  schema.statics.CONTACT_METHOD_SMS = ContactMethod.SMS;
  schema.statics.CONTACT_METHOD_USSD = ContactMethod.USSD;
  schema.statics.CONTACT_METHOD_EMAIL = ContactMethod.EMAIL;
  schema.statics.CONTACT_METHOD_MOBILE_APP = ContactMethod.MOBILE_APP;
  schema.statics.CONTACT_METHOD_WEBSITE = ContactMethod.WEBSITE;
  schema.statics.CONTACT_METHODS = ContactMethod.METHODS;

  /**
   * @name getPhones
   * @function getPhones
   * @description pull distinct service request reporter phones
   * @param {Object} [criteria] valid query criteria
   * @param {function} done a callback to invoke on success or error
   * @return {String[]|Error}
   * @since 0.1.0
   * @version 0.1.0
   * @static
   */
  schema.statics.getPhones = function getPhones(criteria, done) {
    //refs
    const ServiceRequest = this;

    //normalize arguments
    const _criteria = _.isFunction(criteria) ? {} : _.merge({}, criteria);
    const _done = _.isFunction(criteria) ? criteria : done;

    ServiceRequest.find(_criteria)
      .distinct('reporter.phone')
      .exec(function onGetPhones(error, phones) {
        if (!error) {
          phones = _.uniq(_.compact([].concat(phones)));
        }
        return _done(error, phones);
      });
  };
};

/* exports */
module.exports = exports = statics;

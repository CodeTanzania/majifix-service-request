'use strict';

/* dependencies */
const _ = require('lodash');
const { copyInstance } = require('@lykmapipo/mongoose-common');
const { Service } = require('@codetanzania/majifix-service');

/* constasts*/
const LEGACY_SERVICE_FIELDS = [
  '_id',
  'code',
  'name',
  'color',
  'group',
  'isExternal',
];

/**
 * @deprecated
 */
const legacy = (schema /*, options*/) => {
  /**
   * @deprecated
   * @function mapToLegacy
   * @name mapToLegacy
   * @description map service request to legacy data structure
   * @param {Function} done  a callback to invoke on success or failure
   * @since  0.1.0
   * @version 0.1.0
   * @public
   */
  schema.methods.mapToLegacy = function mapToLegacy() {
    const servicerequest = this;

    const copyOfRequest = copyInstance(this);

    if (servicerequest.group) {
      copyOfRequest.group.name = _.get(servicerequest, 'group.name.en');
    }

    if (servicerequest.service) {
      const service = Service.mapToLegacy(servicerequest.service);
      copyOfRequest.service = _.pick(service, LEGACY_SERVICE_FIELDS);
    }

    if (servicerequest.priority) {
      copyOfRequest.priority.name = _.get(servicerequest, 'priority.name.en');
    }

    if (servicerequest.status) {
      copyOfRequest.status.name = _.get(servicerequest, 'status.name.en');
    }

    copyOfRequest.changelogs = _.map(servicerequest.changelogs, changelog => {
      const copyOfChangelog = copyInstance(changelog);
      if (changelog.priority) {
        copyOfChangelog.priority.name = _.get(changelog, 'priority.name.en');
      }
      if (changelog.status) {
        copyOfChangelog.status.name = _.get(changelog, 'status.name.en');
      }
      return copyOfChangelog;
    });

    return copyOfRequest;
  };
};

/* exports */
module.exports = exports = legacy;

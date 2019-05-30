'use strict';

/* dependencies */
const { mergeObjects } = require('@lykmapipo/common');
const { Jurisdiction } = require('@codetanzania/majifix-jurisdiction');
const { ServiceGroup } = require('@codetanzania/majifix-service-group');
const { Priority } = require('@codetanzania/majifix-priority');
const { Status } = require('@codetanzania/majifix-status');
const { Service } = require('@codetanzania/majifix-service');

exports.MODEL_NAME = 'ServiceRequest';

exports.COLLECTION_NAME = 'servicerequests';

exports.AUTOPOPULATE_MAX_DEPTH = 1;

exports.OPTION_AUTOPOPULATE = {
  select: {
    jurisdiction: 1,
    group: 1,
    service: 1,
    priority: 1,
    status: 1,
    code: 1,
    reporter: 1,
    location: 1,
  },
  maxDepth: 1,
};

exports.JURISDICTION_AUTOPOPULATE = mergeObjects(
  Jurisdiction.OPTION_AUTOPOPULATE,
  {
    path: 'jurisdiction',
    maxDepth: exports.AUTOPOPULATE_MAX_DEPTH,
  }
);

exports.SERVICEGROUP_AUTOPOPULATE = mergeObjects(
  ServiceGroup.OPTION_AUTOPOPULATE,
  {
    path: 'group',
    maxDepth: exports.AUTOPOPULATE_MAX_DEPTH,
  }
);

exports.SERVICE_AUTOPOPULATE = mergeObjects(Service.OPTION_AUTOPOPULATE, {
  path: 'service',
  maxDepth: exports.AUTOPOPULATE_MAX_DEPTH,
});

exports.PRIORITY_AUTOPOPULATE = mergeObjects(Priority.OPTION_AUTOPOPULATE, {
  path: 'priority',
  maxDepth: exports.AUTOPOPULATE_MAX_DEPTH,
});

exports.STATUS_AUTOPOPULATE = mergeObjects(Status.OPTION_AUTOPOPULATE, {
  path: 'status',
  maxDepth: exports.AUTOPOPULATE_MAX_DEPTH,
});

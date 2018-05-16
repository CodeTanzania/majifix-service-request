'use strict';

/* dependencies */
const path = require('path');

/* assertions */
const assertChangeLog = require(path.join(__dirname, '..', 'assertions', 'changelog.assertions'));

const ChangeLogSchema = require(path.join(__dirname, '..', '..', 'lib', 'schemas', 'changelog.schema'));

describe('ChangeLog', function () {

  assertChangeLog(ChangeLogSchema);

});

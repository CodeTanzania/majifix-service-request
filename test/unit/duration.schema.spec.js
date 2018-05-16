'use strict';

/* dependencies */
const path = require('path');

/* assertions */
const assertDuration = require(path.join(__dirname, '..', 'assertions', 'duration.assertions'));

const DurationSchema = require(path.join(__dirname, '..', '..', 'lib', 'schemas', 'duration.schema'));

describe('Duration', function () {

  assertDuration(DurationSchema);

});

'use strict';

/* dependencies */
const path = require('path');

/* assertions */
const assertCall = require(path.join(__dirname, '..', 'assertions', 'call.assertions'));

const CallSchema = require(path.join(__dirname, '..', '..', 'lib', 'schemas', 'call.schema'));

describe('Call', function () {

  assertCall(CallSchema);

});

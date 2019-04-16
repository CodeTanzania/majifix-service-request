'use strict';

/* dependencies */
const path = require('path');


/* assertions */
const assertReporter = require(path.join(__dirname, '..', 'assertions', 'reporter.assertions'));


const ReporterSchema = require(path.join(__dirname, '..', '..', 'lib', 'schemas', 'reporter.schema'));

describe('Reporter', function () {

  assertReporter(ReporterSchema);

});

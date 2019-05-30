'use strict';

/* dependencies */
const path = require('path');

/* assertions */
const assertReporter = require(path.join(
  __dirname,
  '..',
  'assertions',
  'reporter.assertions'
));

const Reporter = require(path.join(
  __dirname,
  '..',
  '..',
  'lib',
  'schemas',
  'reporter.schema'
));

describe('Reporter', () => {
  assertReporter(Reporter);
});

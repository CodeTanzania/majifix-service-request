'use strict';

/* dependencies */
const path = require('path');

/* assertions */
const assertSla = require(path.join(
  __dirname,
  '..',
  'assertions',
  'sla.assertions'
));

const SlaSchema = require(path.join(
  __dirname,
  '..',
  '..',
  'lib',
  'schemas',
  'sla.schema'
));

describe('Sla', () => {
  assertSla(SlaSchema);
});

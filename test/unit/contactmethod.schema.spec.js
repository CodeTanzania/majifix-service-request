'use strict';

/* dependencies */
const path = require('path');

/* assertions */
const assertContactMethod = require(path.join(
  __dirname,
  '..',
  'assertions',
  'contactmethod.assertions'
));

const ContactMethod = require(path.join(
  __dirname,
  '..',
  '..',
  'lib',
  'schemas',
  'contactmethod.schema'
));

describe('ContactMethod', () => {
  assertContactMethod(ContactMethod);
});

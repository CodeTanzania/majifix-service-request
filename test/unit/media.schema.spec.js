'use strict';

/* dependencies */
const path = require('path');

/* assertions */
const assertMedia = require(path.join(
  __dirname,
  '..',
  'assertions',
  'media.assertions'
));

const Media = require(path.join(
  __dirname,
  '..',
  '..',
  'lib',
  'schemas',
  'media.schema'
));

describe('Media', () => {
  assertMedia(Media);
});

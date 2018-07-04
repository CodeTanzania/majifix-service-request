'use strict';

/* dependencies */
const path = require('path');

/* assertions */
const assertMedia = require(path.join(__dirname, '..', 'assertions', 'media.assertions'));

const MediaSchema = require(path.join(__dirname, '..', '..', 'lib', 'schemas', 'media.schema'));

describe('Media', function () {

  assertMedia(MediaSchema);

});

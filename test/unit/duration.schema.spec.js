'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('@lykmapipo/mongoose-test-helpers');

/* assertions */
const assertDuration = require(path.join(
  __dirname,
  '..',
  'assertions',
  'duration.assertions'
));

const { Duration, parseDuration } = require(path.join(
  __dirname,
  '..',
  '..',
  'lib',
  'schemas',
  'duration.schema'
));

describe('Duration', () => {
  assertDuration(Duration);

  it('should parse duration to respective parts', done => {
    parseDuration({ milliseconds: 91487000 }, (error, duration) => {
      expect(error).to.not.exist;
      expect(duration).to.exist;
      expect(duration).to.be.eql({
        milliseconds: 91487000,
        human: '1d 1h 24m 47s',
        days: 1,
        hours: 1,
        minutes: 24,
        seconds: 47
      });
      done(error, duration);
    });
  });
});

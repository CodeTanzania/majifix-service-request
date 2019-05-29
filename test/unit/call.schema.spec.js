'use strict';

/* dependencies */
const path = require('path');
const { expect, faker } = require('@lykmapipo/mongoose-test-helpers');

/* assertions */
const assertCall = require(path.join(
  __dirname,
  '..',
  'assertions',
  'call.assertions'
));

const { Call, callDurationOf } = require(path.join(
  __dirname,
  '..',
  '..',
  'lib',
  'schemas',
  'call.schema'
));

describe('Call', () => {
  assertCall(Call);

  it('should calculate duration with dates', () => {
    const call = { startedAt: faker.date.past(), endedAt: faker.date.future() };
    const duration = callDurationOf(call);
    expect(duration).to.exist;
    expect(duration).to.be.at.least(0);
  });

  it('should calculate duration with no dates', () => {
    const duration = callDurationOf();
    expect(duration).to.exist;
  });
});

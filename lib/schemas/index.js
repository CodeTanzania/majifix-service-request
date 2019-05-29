'use strict';

/* dependencies */
const { Duration } = require(`${__dirname}/duration.schema`);
const { Call } = require(`${__dirname}/call.schema`);

exports.Duration = Duration;
exports.Call = Call;
exports.Reporter = require(`${__dirname}/reporter.schema`);
exports.ContactMethod = require(`${__dirname}/contactmethod.schema`);
exports.Media = require(`${__dirname}/media.schema`);

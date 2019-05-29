'use strict';

/* dependencies */
const { Duration } = require(`${__dirname}/duration.schema`);

exports.Duration = Duration;
exports.Reporter = require(`${__dirname}/reporter.schema`);
exports.ContactMethod = require(`${__dirname}/contactmethod.schema`);
exports.Call = require(`${__dirname}/call.schema`);
exports.Media = require(`${__dirname}/media.schema`);

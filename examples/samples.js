'use strict';

/* depedencies */
const _ = require('lodash');
const faker = require('faker');
const {
  randomPoint
} = require('mongoose-geojson-schemas');


function sample() {
  return {
    reporter: {
      name: faker.name.findName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      account: faker.finance.account()
    },
    code: faker.finance.account(),
    description: faker.lorem.paragraph(),
    address: faker.address.streetAddress(),
    location: randomPoint()
  };
}

module.exports = function (size = 10) {
  size = size > 0 ? size : 10;
  return _.times(size, sample);
};
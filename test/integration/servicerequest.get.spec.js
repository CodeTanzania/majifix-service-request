'use strict';

/* dependencies */
const path = require('path');
const _ = require('lodash');
const { expect } = require('chai');
const { create, clear } = require('@lykmapipo/mongoose-test-helpers');
const { Jurisdiction } = require('@codetanzania/majifix-jurisdiction');
const { Status } = require('@codetanzania/majifix-status');
const { Priority } = require('@codetanzania/majifix-priority');
const { Service } = require('@codetanzania/majifix-service');
const { ServiceGroup } = require('@codetanzania/majifix-service-group');
const { ServiceRequest } = require(path.join(__dirname, '..', '..'));

describe('ServiceRequest', () => {
  let jurisdiction = Jurisdiction.fake();
  let serviceGroup = ServiceGroup.fake();
  let status = Status.fake();
  let priority = Priority.fake();

  let service = Service.fake();
  service.group = serviceGroup;

  let serviceRequests;

  before(done => create(jurisdiction, serviceGroup, status, priority, done));

  before(done => create(service, done));

  before(done => {
    serviceRequests = ServiceRequest.fake(32);
    serviceRequests = _.map(serviceRequests, serviceRequest => {
      serviceRequest.jurisdiction = jurisdiction;
      serviceRequest.group = serviceGroup;
      serviceRequest.service = service;
      serviceRequest.priority = priority;
      serviceRequest.status = status;
      return serviceRequest;
    });
    create(...serviceRequests, done);
  });

  describe('get', () => {
    it('should be able to get without options', done => {
      ServiceRequest.get(function(error, results) {
        expect(error).to.not.exist;
        expect(results).to.exist;
        expect(results.data).to.exist;
        expect(results.data).to.have.length(10);
        expect(results.total).to.exist;
        expect(results.total).to.be.equal(32);
        expect(results.limit).to.exist;
        expect(results.limit).to.be.equal(10);
        expect(results.skip).to.exist;
        expect(results.skip).to.be.equal(0);
        expect(results.page).to.exist;
        expect(results.page).to.be.equal(1);
        expect(results.pages).to.exist;
        expect(results.pages).to.be.equal(4);
        expect(results.lastModified).to.exist;

        expect(_.maxBy(results.data, 'updatedAt').updatedAt).to.be.at.most(
          results.lastModified
        );
        done(error, results);
      });
    });

    it('should be able to get with options', function(done) {
      const options = { page: 1, limit: 20 };
      ServiceRequest.get(options, function(error, results) {
        expect(error).to.not.exist;
        expect(results).to.exist;
        expect(results.data).to.exist;
        expect(results.data).to.have.length(20);
        expect(results.total).to.exist;
        expect(results.total).to.be.equal(32);
        expect(results.limit).to.exist;
        expect(results.limit).to.be.equal(20);
        expect(results.skip).to.exist;
        expect(results.skip).to.be.equal(0);
        expect(results.page).to.exist;
        expect(results.page).to.be.equal(1);
        expect(results.pages).to.exist;
        expect(results.pages).to.be.equal(2);
        expect(results.lastModified).to.exist;
        expect(_.maxBy(results.data, 'updatedAt').updatedAt).to.be.at.most(
          results.lastModified
        );
        done(error, results);
      });
    });

    it('should be able to search with options', function(done) {
      const options = { filter: { q: serviceRequests[0].code } };
      ServiceRequest.get(options, function(error, results) {
        expect(error).to.not.exist;
        expect(results).to.exist;
        expect(results.data).to.exist;
        expect(results.data).to.have.length(1);
        expect(results.total).to.exist;
        expect(results.total).to.be.equal(1);
        expect(results.limit).to.exist;
        expect(results.limit).to.be.equal(10);
        expect(results.skip).to.exist;
        expect(results.skip).to.be.equal(0);
        expect(results.page).to.exist;
        expect(results.page).to.be.equal(1);
        expect(results.pages).to.exist;
        expect(results.pages).to.be.equal(1);
        expect(results.lastModified).to.exist;
        expect(_.maxBy(results.data, 'updatedAt').updatedAt).to.be.at.most(
          results.lastModified
        );
        done(error, results);
      });
    });

    it('should parse filter options', function(done) {
      const options = { filter: { code: serviceRequests[0].code } };
      ServiceRequest.get(options, function(error, results) {
        expect(error).to.not.exist;
        expect(results).to.exist;
        expect(results.data).to.exist;
        expect(results.data).to.have.length(1);
        expect(results.total).to.exist;
        expect(results.total).to.be.equal(1);
        expect(results.limit).to.exist;
        expect(results.limit).to.be.equal(10);
        expect(results.skip).to.exist;
        expect(results.skip).to.be.equal(0);
        expect(results.page).to.exist;
        expect(results.page).to.be.equal(1);
        expect(results.pages).to.exist;
        expect(results.pages).to.be.equal(1);
        expect(results.lastModified).to.exist;
        expect(_.maxBy(results.data, 'updatedAt').updatedAt).to.be.at.most(
          results.lastModified
        );
        done(error, results);
      });
    });
  });

  after(done =>
    clear(
      'ServiceRequest',
      'Status',
      'Jurisdiction',
      'Priority',
      'Service',
      'ServiceGroup',
      done
    )
  );
});

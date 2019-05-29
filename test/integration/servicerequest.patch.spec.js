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
  let group = ServiceGroup.fake();
  let status = Status.fake();
  let priority = Priority.fake();

  let service = Service.fake();
  service.group = group;

  before(done => create(jurisdiction, group, status, priority, done));

  before(done => create(service, done));

  describe('static put', () => {
    let serviceRequest;

    before(done => {
      serviceRequest = ServiceRequest.fake();
      serviceRequest.set({
        jurisdiction,
        group,
        service,
        priority,
        status,
      });

      create(serviceRequest, done);
    });

    it('should be able patch', done => {
      serviceRequest = serviceRequest.fakeOnly('code');

      ServiceRequest.patch(
        serviceRequest._id,
        serviceRequest,
        (error, updated) => {
          expect(error).to.not.exist;
          expect(updated).to.exist;
          expect(updated._id).to.eql(serviceRequest._id);
          expect(updated.code).to.equal(serviceRequest.code);

          //assert jurisdiction
          expect(updated.jurisdiction).to.exist;
          expect(updated.jurisdiction.code).to.eql(
            serviceRequest.jurisdiction.code
          );
          expect(updated.jurisdiction.name).to.eql(
            serviceRequest.jurisdiction.name
          );
          done(error, updated);
        }
      );
    });

    it('should throw if not exists', done => {
      const fake = ServiceRequest.fake();

      ServiceRequest.patch(fake._id, _.omit(fake, '_id'), (error, updated) => {
        expect(error).to.exist;
        // expect(error.status).to.exist;
        expect(error.name).to.be.equal('DocumentNotFoundError');
        expect(updated).to.not.exist;
        done();
      });
    });
  });

  describe('instance put', () => {
    let serviceRequest;

    before(done => {
      serviceRequest = ServiceRequest.fake();
      serviceRequest.set({
        jurisdiction,
        group,
        service,
        priority,
        status,
      });

      create(serviceRequest, done);
    });

    it('should be able patch', done => {
      serviceRequest = serviceRequest.fakeOnly('name');

      serviceRequest.patch((error, updated) => {
        expect(error).to.not.exist;
        expect(updated).to.exist;
        expect(updated._id).to.eql(serviceRequest._id);
        expect(updated.code).to.equal(serviceRequest.code);
        done(error, updated);
      });
    });

    it('should throw if not exists', done => {
      serviceRequest.patch((error, updated) => {
        expect(error).to.not.exist;
        expect(updated).to.exist;
        expect(updated._id).to.eql(serviceRequest._id);
        done();
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

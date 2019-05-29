'use strict';

/* dependencies */
const path = require('path');
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

  describe('static delete', () => {
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

    it('should be able to delete', done => {
      ServiceRequest.del(serviceRequest._id, (error, deleted) => {
        expect(error).to.not.exist;
        expect(deleted).to.exist;
        expect(deleted._id).to.eql(serviceRequest._id);

        //assert jurisdiction
        expect(deleted.jurisdiction).to.exist;
        expect(deleted.jurisdiction.code).to.eql(
          serviceRequest.jurisdiction.code
        );
        expect(deleted.jurisdiction.name).to.eql(
          serviceRequest.jurisdiction.name
        );
        done(error, deleted);
      });
    });

    it('should throw if not exists', done => {
      const serviceRequest = ServiceRequest.fake();
      ServiceRequest.del(serviceRequest._id, (error, deleted) => {
        expect(error).to.exist;
        // expect(error.status).to.exist;
        expect(error.name).to.be.equal('DocumentNotFoundError');
        expect(deleted).to.not.exist;
        done();
      });
    });
  });

  describe('instance delete', () => {
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

    it('should be able to delete', done => {
      serviceRequest.del((error, deleted) => {
        expect(error).to.not.exist;
        expect(deleted).to.exist;
        expect(deleted._id).to.eql(serviceRequest._id);
        done(error, deleted);
      });
    });

    it('should throw if not exists', done => {
      serviceRequest.del((error, deleted) => {
        expect(error).to.not.exist;
        expect(deleted).to.exist;
        expect(deleted._id).to.eql(serviceRequest._id);
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

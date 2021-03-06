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

  let serviceRequest;

  before(done => create(jurisdiction, group, status, priority, done));

  before(done => create(service, done));

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

  describe('get by id', () => {
    it('should be able to get an instance', done => {
      ServiceRequest.getById(serviceRequest._id, (error, found) => {
        expect(error).to.not.exist;
        expect(found).to.exist;
        expect(found._id).to.eql(serviceRequest._id);

        //assert jurisdiction
        expect(found.jurisdiction).to.exist;
        expect(found.jurisdiction.code).to.eql(
          serviceRequest.jurisdiction.code
        );
        expect(found.jurisdiction.name).to.eql(
          serviceRequest.jurisdiction.name
        );
        done(error, found);
      });
    });

    it('should be able to get with options', done => {
      const options = {
        _id: serviceRequest._id,
        select: 'code',
      };

      ServiceRequest.getById(options, (error, found) => {
        expect(error).to.not.exist;
        expect(found).to.exist;
        expect(found._id).to.eql(serviceRequest._id);
        expect(found.code).to.exist;

        //...assert selection
        const fields = _.keys(found.toObject());
        expect(fields).to.have.length(7);
        _.map(['assignee', 'createdAt', 'updatedAt'], field => {
          expect(fields).to.not.include(field);
        });

        done(error, found);
      });
    });

    it('should throw if not exists', done => {
      const serviceRequest = ServiceRequest.fake();

      ServiceRequest.getById(serviceRequest._id, (error, found) => {
        expect(error).to.exist;
        // expect(error.status).to.exist;
        expect(error.name).to.be.equal('DocumentNotFoundError');
        expect(found).to.not.exist;
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

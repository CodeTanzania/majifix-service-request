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

  describe('static post', () => {
    it('should be able to post', done => {
      let serviceRequest = ServiceRequest.fake();

      serviceRequest.set({
        jurisdiction,
        group,
        service,
        priority,
        status,
      });

      ServiceRequest.post(serviceRequest, (error, created) => {
        expect(error).to.not.exist;
        expect(created).to.exist;
        expect(created._id).to.eql(serviceRequest._id);
        expect(created.code).to.equal(serviceRequest.code);

        // assert jurisdiction
        expect(created.jurisdiction).to.exist;
        expect(created.jurisdiction.code).to.eql(
          serviceRequest.jurisdiction.code
        );
        expect(created.jurisdiction.name).to.eql(
          serviceRequest.jurisdiction.name
        );

        expect(created.group).to.exist;
        expect(created.group.code).to.eql(serviceRequest.group.code);
        expect(created.group.name.en).to.eql(serviceRequest.group.name.en);

        expect(created.service).to.exist;
        expect(created.service.code).to.eql(serviceRequest.service.code);
        expect(created.service.name.en).to.eql(serviceRequest.service.name.en);

        expect(created.status).to.exist;
        expect(created.status.code).to.eql(serviceRequest.status.code);
        expect(created.status.name.en).to.eql(serviceRequest.status.name.en);

        expect(created.priority).to.exist;
        expect(created.priority.code).to.eql(serviceRequest.priority.code);
        expect(created.priority.name.en).to.eql(
          serviceRequest.priority.name.en
        );
        done(error, created);
      });
    });
  });

  describe('instance post', () => {
    it('should be able to post', done => {
      let serviceRequest = ServiceRequest.fake();
      serviceRequest.set({
        jurisdiction,
        group,
        service,
        priority,
        status,
      });

      serviceRequest.post((error, created) => {
        expect(error).to.not.exist;
        expect(created).to.exist;
        expect(created._id).to.eql(serviceRequest._id);
        expect(created.code).to.equal(serviceRequest.code);

        //assert jurisdiction
        expect(created.jurisdiction).to.exist;
        expect(created.jurisdiction.code).to.eql(
          serviceRequest.jurisdiction.code
        );
        expect(created.jurisdiction.name).to.eql(
          serviceRequest.jurisdiction.name
        );

        expect(created.group).to.exist;
        expect(created.group.code).to.eql(serviceRequest.group.code);
        expect(created.group.name.en).to.eql(serviceRequest.group.name.en);

        expect(created.service).to.exist;
        expect(created.service.code).to.eql(serviceRequest.service.code);
        expect(created.service.name.en).to.eql(serviceRequest.service.name.en);

        expect(created.status).to.exist;
        expect(created.status.code).to.eql(serviceRequest.status.code);
        expect(created.status.name.en).to.eql(serviceRequest.status.name.en);

        expect(created.priority).to.exist;
        expect(created.priority.code).to.eql(serviceRequest.priority.code);
        expect(created.priority.name.en).to.eql(
          serviceRequest.priority.name.en
        );
        done(error, created);
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

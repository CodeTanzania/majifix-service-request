'use strict';

/* dependencies */
const path = require('path');
const request = require('supertest');
const { expect } = require('chai');
const { Jurisdiction } = require('@codetanzania/majifix-jurisdiction');
const { Status } = require('@codetanzania/majifix-status');
const { Priority } = require('@codetanzania/majifix-priority');
const { Service } = require('@codetanzania/majifix-service');
const { ServiceGroup } = require('@codetanzania/majifix-service-group');
const { clear, create } = require('@lykmapipo/mongoose-test-helpers');
const { ServiceRequest, apiVersion, app } = require(path.join(
  __dirname,
  '..',
  '..'
));

describe('Service Request', () => {
  describe('Rest API', () => {
    let jurisdiction = Jurisdiction.fake();
    let serviceGroup = ServiceGroup.fake();
    let status = Status.fake();
    let priority = Priority.fake();

    let service = Service.fake();
    service.group = serviceGroup;

    let serviceRequest;

    before(done => create(jurisdiction, serviceGroup, status, priority, done));

    before(done => create(service, done));

    before(done => {
      clear('ServiceRequest', done);
    });

    before(done => {
      serviceRequest = ServiceRequest.fake();
      serviceRequest.jurisdiction = jurisdiction;
      serviceRequest.group = serviceGroup;
      serviceRequest.service = service;
      serviceRequest.priority = priority;
      serviceRequest.status = status;

      create(serviceRequest, done);
    });

    it.skip('should handle HTTP POST on /servicerequests', done => {
      request(app)
        .post(`/${apiVersion}/servicerequests`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(serviceRequest)
        .expect(201)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const created = response.body;

          expect(created._id).to.exist;
          expect(created.code).to.exist;

          done(error, response);
        });
    });

    it('should handle HTTP GET on /servicerequests', done => {
      request(app)
        .get(`/${apiVersion}/servicerequests`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          //assert payload
          const result = response.body;
          expect(result.data).to.exist;
          expect(result.total).to.exist;
          expect(result.limit).to.exist;
          expect(result.skip).to.exist;
          expect(result.page).to.exist;
          expect(result.pages).to.exist;
          expect(result.lastModified).to.exist;
          done(error, response);
        });
    });

    it('should handle HTTP GET on /servicerequests/:id', done => {
      request(app)
        .get(`/${apiVersion}/servicerequests/${serviceRequest._id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const found = response.body;
          expect(found._id).to.exist;
          expect(found._id).to.be.equal(serviceRequest._id.toString());
          expect(found.code).to.be.equal(serviceRequest.code);

          done(error, response);
        });
    });

    it('should handle HTTP PATCH on /servicerequests/:id', done => {
      const patch = serviceRequest.fakeOnly('code');

      request(app)
        .patch(`/${apiVersion}/servicerequests/${serviceRequest._id}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(patch)
        .expect(200)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const patched = response.body;

          expect(patched._id).to.exist;
          expect(patched._id).to.be.equal(serviceRequest._id.toString());
          expect(patched.code).to.be.equal(serviceRequest.code);

          done(error, response);
        });
    });

    it('should handle HTTP PUT on /servicerequests/id:', done => {
      const put = serviceRequest.fakeOnly('code');

      request(app)
        .put(`/${apiVersion}/servicerequests/${serviceRequest._id}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(put)
        .expect(200)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const updated = response.body;

          expect(updated._id).to.exist;
          expect(updated._id).to.be.equal(serviceRequest._id.toString());
          expect(updated.code).to.be.equal(serviceRequest.code);

          done(error, response);
        });
    });

    it('should handle HTTP DELETE on /servicerequests/:id', done => {
      request(app)
        .delete(`/${apiVersion}/servicerequests/${serviceRequest._id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const deleted = response.body;

          expect(deleted._id).to.exist;
          expect(deleted._id).to.be.equal(serviceRequest._id.toString());
          expect(deleted.code).to.be.equal(serviceRequest.code);

          done(error, response);
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

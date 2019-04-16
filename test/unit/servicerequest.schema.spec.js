'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('chai');

/* declarations */
const ServiceRequest = require(path.join(
  __dirname,
  '..',
  '..',
  'lib',
  'servicerequest.model'
));

/* assertions */
const assertionsPath = path.join(__dirname, '..', 'assertions');

const assertAttachment = require(path.join(assertionsPath, 'media.assertions'));
const assertCall = require(path.join(assertionsPath, 'call.assertions'));
const assertMethod = require(path.join(
  assertionsPath,
  'contactmethod.assertions'
));
const assertReporter = require(path.join(
  assertionsPath,
  'reporter.assertions'
));
const assertTtr = require(path.join(assertionsPath, 'duration.assertions'));

describe('ServiceRequest', function() {
  describe('Schema', function() {
    it('should have jurisdiction field', function() {
      const jurisdiction = ServiceRequest.schema.tree.jurisdiction;
      const instance = ServiceRequest.schema.paths.jurisdiction.instance;

      expect(instance).to.be.equal('ObjectID');
      expect(jurisdiction).to.exist;
      expect(jurisdiction).to.be.an('object');
      expect(jurisdiction.type).to.be.a('function');
      expect(jurisdiction.type.name).to.be.equal('ObjectId');
      expect(jurisdiction.ref).to.be.equal('Jurisdiction');
      expect(jurisdiction.required).to.be.true;
      expect(jurisdiction.autoset).to.be.true;
      expect(jurisdiction.exists).to.be.true;
      expect(jurisdiction.exists).to.exist;
      expect(jurisdiction.index).to.be.true;
    });

    it('should have group field', function() {
      const group = ServiceRequest.schema.tree.group;
      const instance = ServiceRequest.schema.paths.group.instance;

      expect(instance).to.be.equal('ObjectID');
      expect(group).to.exist;
      expect(group).to.be.an('object');
      expect(group.type).to.be.a('function');
      expect(group.type.name).to.be.equal('ObjectId');
      expect(group.ref).to.be.equal('ServiceGroup');
      expect(group.required).to.be.true;
      expect(group.autoset).to.be.true;
      expect(group.exists).to.be.true;
      expect(group.exists).to.exist;
      expect(group.index).to.be.true;
    });

    it('should have service field', function() {
      const service = ServiceRequest.schema.tree.service;
      const instance = ServiceRequest.schema.paths.service.instance;

      expect(instance).to.be.equal('ObjectID');
      expect(service).to.exist;
      expect(service).to.be.an('object');
      expect(service.type).to.be.a('function');
      expect(service.type.name).to.be.equal('ObjectId');
      expect(service.ref).to.be.equal('Service');
      expect(service.required).to.be.true;
      expect(service.autoset).to.be.true;
      expect(service.exists).to.be.true;
      expect(service.exists).to.exist;
      expect(service.index).to.be.true;
    });

    it('should have priority field', function() {
      const priority = ServiceRequest.schema.tree.priority;
      const instance = ServiceRequest.schema.paths.priority.instance;

      expect(instance).to.be.equal('ObjectID');
      expect(priority).to.exist;
      expect(priority).to.be.an('object');
      expect(priority.type).to.be.a('function');
      expect(priority.type.name).to.be.equal('ObjectId');
      expect(priority.ref).to.be.equal('Priority');
      expect(priority.required).to.be.true;
      expect(priority.autoset).to.be.true;
      expect(priority.exists).to.be.true;
      expect(priority.exists).to.exist;
      expect(priority.index).to.be.true;
    });

    it('should have status field', function() {
      const status = ServiceRequest.schema.tree.status;
      const instance = ServiceRequest.schema.paths.status.instance;

      expect(instance).to.be.equal('ObjectID');
      expect(status).to.exist;
      expect(status).to.be.an('object');
      expect(status.type).to.be.a('function');
      expect(status.type.name).to.be.equal('ObjectId');
      expect(status.ref).to.be.equal('Status');
      expect(status.required).to.be.true;
      expect(status.autoset).to.be.true;
      expect(status.exists).to.be.true;
      expect(status.exists).to.exist;
      expect(status.index).to.be.true;
    });

    describe('reporter', function() {
      assertReporter(ServiceRequest.schema.paths.reporter.schema);
    });

    describe('method', function() {
      assertMethod(ServiceRequest.schema.paths.method.schema);
    });

    describe('attachments', function() {
      it('should have index property', function() {
        const attachments = ServiceRequest.schema.tree.attachments;

        expect(attachments.index).to.exist;
        expect(attachments.index).to.be.true;
      });

      assertAttachment(ServiceRequest.schema.paths.attachments.schema);
    });

    describe('ttr', function() {
      assertTtr(ServiceRequest.schema.paths.ttr.schema);
    });

    describe('call', function() {
      assertCall(ServiceRequest.schema.paths.call.schema);
    });

    it('should have code field', function() {
      const code = ServiceRequest.schema.tree.code;
      const instance = ServiceRequest.schema.paths.code.instance;

      expect(instance).to.be.equal('String');
      expect(code).to.exist;
      expect(code).to.be.an('object');
      expect(code.type).to.be.a('function');
      expect(code.type.name).to.be.equal('String');
      expect(code.trim).to.be.true;
      expect(code.required).to.be.true;
      expect(code.uppercase).to.be.true;
      expect(code.unique).to.be.true;
      expect(code.searchable).to.be.true;
      expect(code.fake).to.exist;
    });

    it('should have description field', function() {
      const description = ServiceRequest.schema.tree.description;
      const instance = ServiceRequest.schema.paths.description.instance;

      expect(instance).to.be.equal('String');
      expect(description).to.exist;
      expect(description).to.be.an('object');
      expect(description.type).to.be.a('function');
      expect(description.type.name).to.be.equal('String');
      expect(description.trim).to.be.true;
      // expect(description.required).to.be.true;
      expect(description.index).to.be.true;
      expect(description.searchable).to.be.true;
      expect(description.fake).to.exist;
    });

    it('should have operator field', function() {
      const operator = ServiceRequest.schema.tree.operator;
      const instance = ServiceRequest.schema.paths.operator.instance;

      expect(instance).to.be.equal('ObjectID');
      expect(operator).to.exist;
      expect(operator).to.be.an('object');
      expect(operator.type).to.be.a('function');
      expect(operator.type.name).to.be.equal('ObjectId');
      expect(operator.ref).to.be.equal('Party');
      expect(operator.autoset).to.be.true;
      expect(operator.exists).to.exist;
      expect(operator.exists).to.be.true;
      expect(operator.index).to.be.true;
    });

    it('should have assignee field', function() {
      const assignee = ServiceRequest.schema.tree.assignee;
      const instance = ServiceRequest.schema.paths.assignee.instance;

      expect(instance).to.be.equal('ObjectID');
      expect(assignee).to.exist;
      expect(assignee).to.be.an('object');
      expect(assignee.type).to.be.a('function');
      expect(assignee.type.name).to.be.equal('ObjectId');
      expect(assignee.ref).to.be.equal('Party');
      expect(assignee.autoset).to.be.true;
      expect(assignee.exists).to.exist;
      expect(assignee.exists).to.be.true;
      expect(assignee.index).to.be.true;
    });

    it('should have address field', function() {
      const address = ServiceRequest.schema.tree.address;
      const instance = ServiceRequest.schema.paths.address.instance;

      expect(instance).to.be.equal('String');
      expect(address).to.exist;
      expect(address).to.be.an('object');
      expect(address.type).to.be.a('function');
      expect(address.type.name).to.be.equal('String');
      expect(address.trim).to.be.true;
      expect(address.index).to.be.true;
      expect(address.searchable).to.be.true;
    });

    it('should have expectedAt field', function() {
      const expectedAt = ServiceRequest.schema.tree.expectedAt;
      const instance = ServiceRequest.schema.paths.expectedAt.instance;

      expect(instance).to.be.equal('Date');
      expect(expectedAt).to.exist;
      expect(expectedAt).to.be.an('object');
      expect(expectedAt.type).to.be.a('function');
      expect(expectedAt.type.name).to.be.equal('Date');
      expect(expectedAt.index).to.be.true;
    });

    it('should have resolvedAt field', function() {
      const resolvedAt = ServiceRequest.schema.tree.resolvedAt;
      const instance = ServiceRequest.schema.paths.resolvedAt.instance;

      expect(instance).to.be.equal('Date');
      expect(resolvedAt).to.exist;
      expect(resolvedAt).to.be.an('object');
      expect(resolvedAt.type).to.be.a('function');
      expect(resolvedAt.type.name).to.be.equal('Date');
      expect(resolvedAt.index).to.be.true;
    });
  });
});

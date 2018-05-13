'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');


/* declarations */
const ServiceRequest =
  require(path.join(__dirname, '..', '..', 'lib', 'servicerequest.model'));


describe('ServiceRequest', function () {

  describe('Schema', function () {

    it('should have jurisdiction field', function () {

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

    it('should have group field', function () {

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

    it('should have service field', function () {

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

    it('should have priority field', function () {

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

    it('should have status field', function () {

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


    describe.skip('reporter');

    it('should have code field', function () {

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

    it('should have description field', function () {

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

  });

});
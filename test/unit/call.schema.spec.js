'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('chai');

const CallSchema = require(path.join(__dirname, '..', '..', 'lib','schemas', 'call.schema'));

describe('Call', function () {

  describe('Schema', function () {

    it('should have startedAt field', function () {
      const startedAt = CallSchema.tree.startedAt;
      const instance = CallSchema.paths.startedAt.instance;

      expect(instance).to.be.equal('Date');
      expect(startedAt).to.exist;
      expect(startedAt).to.be.an('object');
      expect(startedAt.type).to.be.a('function');
      expect(startedAt.type.name).to.be.equal('Date');
      expect(startedAt.index).to.be.true;

    });

    it('should have endedAt field', function () {

      const endedAt = CallSchema.tree.endedAt;
      const instance = CallSchema.paths.endedAt.instance;

      expect(instance).to.be.equal('Date');
      expect(endedAt).to.exist;
      expect(endedAt).to.be.an('object');
      expect(endedAt.type).to.be.a('function');
      expect(endedAt.type.name).to.be.equal('Date');
      expect(endedAt.index).to.be.true;
    });

    it('should have Duration field');
  });
});

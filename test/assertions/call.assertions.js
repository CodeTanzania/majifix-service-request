'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('chai');

/* declarations */
const assertDuration = require(path.join(__dirname, 'duration.assertions'));

module.exports = function (Call) {
  describe('Schema', () => {
    it('should have startedAt field', () => {
      const startedAt = Call.tree.startedAt;
      const instance = Call.paths.startedAt.instance;

      expect(instance).to.be.equal('Date');
      expect(startedAt).to.exist;
      expect(startedAt).to.be.an('object');
      expect(startedAt.type).to.be.a('function');
      expect(startedAt.type.name).to.be.equal('Date');
      expect(startedAt.index).to.be.true;
    });

    it('should have endedAt field', () => {
      const endedAt = Call.tree.endedAt;
      const instance = Call.paths.endedAt.instance;

      expect(instance).to.be.equal('Date');
      expect(endedAt).to.exist;
      expect(endedAt).to.be.an('object');
      expect(endedAt.type).to.be.a('function');
      expect(endedAt.type.name).to.be.equal('Date');
      expect(endedAt.index).to.be.true;
    });

    describe('duration', () => {
      assertDuration(Call.paths.duration.schema);
    });
  });
};

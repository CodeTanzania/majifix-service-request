'use strict';

/* dependencies */
const { expect } = require('chai');

module.exports = function (SlaSchema) {

  describe('Schema', function () {

    it('should have ttr field', function () {
      const ttr = SlaSchema.tree.ttr;
      const instance = SlaSchema.paths.ttr.instance;

      expect(instance).to.be.equal('Number');
      expect(ttr).to.exist;
      expect(ttr).to.be.an('object');
      expect(ttr.type).to.be.a('function');
      expect(ttr.type.name).to.be.equal('Number');
    });
  });

};

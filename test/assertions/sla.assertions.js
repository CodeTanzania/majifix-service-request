'use strict';

/* dependencies */
const { expect } = require('chai');

module.exports = function(Sla) {
  describe('Schema', () => {
    it('should have ttr field', () => {
      const ttr = Sla.tree.ttr;
      const instance = Sla.paths.ttr.instance;

      expect(instance).to.be.equal('Number');
      expect(ttr).to.exist;
      expect(ttr).to.be.an('object');
      expect(ttr.type).to.be.a('function');
      expect(ttr.type.name).to.be.equal('Number');
    });
  });
};

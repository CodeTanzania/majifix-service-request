'use strict';

/* dependencies */
const { expect } = require('chai');

module.exports = function(ContactMethodSchema) {
  describe('Schema', () => {
    it('should have name field', () => {
      const name = ContactMethodSchema.tree.name;
      const instance = ContactMethodSchema.paths.name.instance;

      expect(instance).to.be.equal('String');
      expect(name).to.exist;
      expect(name).to.be.an('object');
      expect(name.type).to.be.a('function');
      expect(name.type.name).to.be.equal('String');
      expect(name.searchable).to.be.true;
      expect(name.index).to.be.true;
    });

    it('should have workspace field', () => {
      const workspace = ContactMethodSchema.tree.workspace;
      const instance = ContactMethodSchema.paths.workspace.instance;

      expect(instance).to.be.equal('String');
      expect(workspace).to.exist;
      expect(workspace).to.be.an('object');
      expect(workspace.type).to.be.a('function');
      expect(workspace.type.name).to.be.equal('String');
      expect(workspace.searchable).to.be.true;
      expect(workspace.index).to.be.true;
    });

    it('should expose contact methods types as statics', () => {
      expect(ContactMethodSchema.statics.PHONE_CALL).to.exist;
      expect(ContactMethodSchema.statics.PHONE_CALL).to.equal('Call');
      expect(ContactMethodSchema.statics.EMAIL).to.exist;
      expect(ContactMethodSchema.statics.EMAIL).to.equal('Email');
      expect(ContactMethodSchema.statics.SMS).to.exist;
      expect(ContactMethodSchema.statics.SMS).to.equal('SMS');
      expect(ContactMethodSchema.statics.USSD).to.exist;
      expect(ContactMethodSchema.statics.USSD).to.equal('USSD');
      expect(ContactMethodSchema.statics.LETTER).to.exist;
      expect(ContactMethodSchema.statics.LETTER).to.equal('Letter');
      expect(ContactMethodSchema.statics.FAX).to.exist;
      expect(ContactMethodSchema.statics.FAX).to.equal('Fax');
      expect(ContactMethodSchema.statics.MOBILE_APP).to.exist;
      expect(ContactMethodSchema.statics.MOBILE_APP).to.equal('MOBILE_APP');
      expect(ContactMethodSchema.statics.METHODS).to.be.an('array');
    });
  });
};

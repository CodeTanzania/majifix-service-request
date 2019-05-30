'use strict';

/* dependencies */
const { expect } = require('chai');

module.exports = function (ContactMethod) {
  describe('Schema', () => {
    it('should have name field', () => {
      const name = ContactMethod.tree.name;
      const instance = ContactMethod.paths.name.instance;

      expect(instance).to.be.equal('String');
      expect(name).to.exist;
      expect(name).to.be.an('object');
      expect(name.type).to.be.a('function');
      expect(name.type.name).to.be.equal('String');
      expect(name.searchable).to.be.true;
      expect(name.index).to.be.true;
    });

    it('should have workspace field', () => {
      const workspace = ContactMethod.tree.workspace;
      const instance = ContactMethod.paths.workspace.instance;

      expect(instance).to.be.equal('String');
      expect(workspace).to.exist;
      expect(workspace).to.be.an('object');
      expect(workspace.type).to.be.a('function');
      expect(workspace.type.name).to.be.equal('String');
      expect(workspace.searchable).to.be.true;
      expect(workspace.index).to.be.true;
    });

    it('should expose contact methods types as statics', () => {
      expect(ContactMethod.statics.PHONE_CALL).to.exist;
      expect(ContactMethod.statics.PHONE_CALL).to.equal('Call');
      expect(ContactMethod.statics.EMAIL).to.exist;
      expect(ContactMethod.statics.EMAIL).to.equal('Email');
      expect(ContactMethod.statics.SMS).to.exist;
      expect(ContactMethod.statics.SMS).to.equal('SMS');
      expect(ContactMethod.statics.USSD).to.exist;
      expect(ContactMethod.statics.USSD).to.equal('USSD');
      expect(ContactMethod.statics.LETTER).to.exist;
      expect(ContactMethod.statics.LETTER).to.equal('Letter');
      expect(ContactMethod.statics.FAX).to.exist;
      expect(ContactMethod.statics.FAX).to.equal('Fax');
      expect(ContactMethod.statics.MOBILE_APP).to.exist;
      expect(ContactMethod.statics.MOBILE_APP).to.equal('Mobile');
      expect(ContactMethod.statics.WEBSITE).to.exist;
      expect(ContactMethod.statics.WEBSITE).to.equal('Website');
      expect(ContactMethod.statics.METHODS).to.be.an('array');
    });
  });
};

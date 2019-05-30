'use strict';

/* dependencies */
const { expect } = require('chai');

module.exports = function(Reporter) {
  describe('Schema', () => {
    it('should have name field', () => {
      const name = Reporter.tree.name;
      const instance = Reporter.paths.name.instance;

      expect(instance).to.be.equal('String');
      expect(name).to.exist;
      expect(name).to.be.an('object');
      expect(name.type).to.be.a('function');
      expect(name.type.name).to.be.equal('String');
      expect(name.trim).to.be.true;
      expect(name.searchable).to.be.true;
      expect(name.index).to.be.true;
    });

    it('should have phone field', () => {
      const phone = Reporter.tree.phone;
      const instance = Reporter.paths.phone.instance;

      expect(instance).to.be.equal('String');
      expect(phone).to.exist;
      expect(phone).to.be.an('object');
      expect(phone.type).to.be.a('function');
      expect(phone.type.name).to.be.equal('String');
      expect(phone.trim).to.be.true;
      expect(phone.searchable).to.be.true;
      expect(phone.required).to.be.true;
      expect(phone.index).to.be.true;
    });

    it('should have email field', () => {
      const email = Reporter.tree.email;
      const instance = Reporter.paths.email.instance;

      expect(instance).to.be.equal('String');
      expect(email).to.exist;
      expect(email).to.be.an('object');
      expect(email.type).to.be.a('function');
      expect(email.type.name).to.be.equal('String');
      expect(email.trim).to.be.true;
      expect(email.searchable).to.be.true;
      expect(email.lowercase).to.be.true;
      expect(email.index).to.be.true;
    });

    it('should have account field', () => {
      const account = Reporter.tree.account;
      const instance = Reporter.paths.account.instance;

      expect(instance).to.be.equal('String');
      expect(account).to.exist;
      expect(account).to.be.an('object');
      expect(account.type).to.be.a('function');
      expect(account.type.name).to.be.equal('String');
      expect(account.trim).to.be.true;
      expect(account.searchable).to.be.true;
      expect(account.uppercase).to.be.true;
      expect(account.index).to.be.true;
    });
  });
};

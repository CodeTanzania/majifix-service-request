'use strict';

/* dependencies */
const { expect } = require('chai');

module.exports = function(Duration) {
  describe('Schema', () => {
    it('should have years field', () => {
      const years = Duration.tree.years;
      const instance = Duration.paths.years.instance;

      expect(instance).to.be.equal('Number');
      expect(years).to.exist;
      expect(years).to.be.an('object');
      expect(years.type).to.be.a('function');
      expect(years.type.name).to.be.equal('Number');
      expect(years.index).to.be.true;
    });

    it('should have months field', () => {
      const months = Duration.tree.months;
      const instance = Duration.paths.months.instance;

      expect(instance).to.be.equal('Number');
      expect(months).to.exist;
      expect(months).to.be.an('object');
      expect(months.type).to.be.a('function');
      expect(months.type.name).to.be.equal('Number');
      expect(months.index).to.be.true;
    });

    it('should have days field', () => {
      const days = Duration.tree.days;
      const instance = Duration.paths.days.instance;

      expect(instance).to.be.equal('Number');
      expect(days).to.exist;
      expect(days).to.be.an('object');
      expect(days.type).to.be.a('function');
      expect(days.type.name).to.be.equal('Number');
      expect(days.index).to.be.true;
    });

    it('should have hours field', () => {
      const hours = Duration.tree.hours;
      const instance = Duration.paths.hours.instance;

      expect(instance).to.be.equal('Number');
      expect(hours).to.exist;
      expect(hours).to.be.an('object');
      expect(hours.type).to.be.a('function');
      expect(hours.type.name).to.be.equal('Number');
      expect(hours.index).to.be.true;
    });

    it('should have minutes field', () => {
      const minutes = Duration.tree.minutes;
      const instance = Duration.paths.minutes.instance;

      expect(instance).to.be.equal('Number');
      expect(minutes).to.exist;
      expect(minutes).to.be.an('object');
      expect(minutes.type).to.be.a('function');
      expect(minutes.type.name).to.be.equal('Number');
      expect(minutes.index).to.be.true;
    });

    it('should have seconds field', () => {
      const seconds = Duration.tree.seconds;
      const instance = Duration.paths.seconds.instance;

      expect(instance).to.be.equal('Number');
      expect(seconds).to.exist;
      expect(seconds).to.be.an('object');
      expect(seconds.type).to.be.a('function');
      expect(seconds.type.name).to.be.equal('Number');
      expect(seconds.index).to.be.true;
    });

    it('should have milliseconds field', () => {
      const milliseconds = Duration.tree.milliseconds;
      const instance = Duration.paths.milliseconds.instance;

      expect(instance).to.be.equal('Number');
      expect(milliseconds).to.exist;
      expect(milliseconds).to.be.an('object');
      expect(milliseconds.type).to.be.a('function');
      expect(milliseconds.type.name).to.be.equal('Number');
      expect(milliseconds.index).to.be.true;
      expect(milliseconds.required).to.be.true;
    });

    it('should have human field', () => {
      const human = Duration.tree.human;
      const instance = Duration.paths.human.instance;

      expect(instance).to.be.equal('String');
      expect(human).to.exist;
      expect(human).to.be.an('object');
      expect(human.type).to.be.a('function');
      expect(human.type.name).to.be.equal('String');
      expect(human.trim).to.be.true;
      expect(human.required).to.be.true;
    });
  });
};

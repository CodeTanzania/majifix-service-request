'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('chai');

const DurationSchema = require(path.join(__dirname, '..', '..', 'lib', 'duration.schema'));

describe('Duration', function () {

  describe('Schema', function () {

    it('should have years field', function () {
      const years = DurationSchema.tree.years;
      const instance = DurationSchema.paths.years.instance;

      expect(instance).to.be.equal('Number');
      expect(years).to.exist;
      expect(years).to.be.an('object');
      expect(years.type).to.be.a('function');
      expect(years.type.name).to.be.equal('Number');
      expect(years.index).to.be.true;

    });

    it('should have months field', function () {

      const months = DurationSchema.tree.months;
      const instance = DurationSchema.paths.months.instance;

      expect(instance).to.be.equal('Number');
      expect(months).to.exist;
      expect(months).to.be.an('object');
      expect(months.type).to.be.a('function');
      expect(months.type.name).to.be.equal('Number');
      expect(months.index).to.be.true;
    });

    it('should have days field', function () {
      const days = DurationSchema.tree.days;
      const instance = DurationSchema.paths.days.instance;

      expect(instance).to.be.equal('Number');
      expect(days).to.exist;
      expect(days).to.be.an('object');
      expect(days.type).to.be.a('function');
      expect(days.type.name).to.be.equal('Number');
      expect(days.index).to.be.true;
    });

    it('should have hours field', function () {
      const hours = DurationSchema.tree.hours;
      const instance = DurationSchema.paths.hours.instance;

      expect(instance).to.be.equal('Number');
      expect(hours).to.exist;
      expect(hours).to.be.an('object');
      expect(hours.type).to.be.a('function');
      expect(hours.type.name).to.be.equal('Number');
      expect(hours.index).to.be.true;
    });

    it('should have minutes field', function () {
      const minutes = DurationSchema.tree.minutes;
      const instance = DurationSchema.paths.minutes.instance;

      expect(instance).to.be.equal('Number');
      expect(minutes).to.exist;
      expect(minutes).to.be.an('object');
      expect(minutes.type).to.be.a('function');
      expect(minutes.type.name).to.be.equal('Number');
      expect(minutes.index).to.be.true;
    });

    it('should have seconds field', function () {
      const seconds = DurationSchema.tree.seconds;
      const instance = DurationSchema.paths.seconds.instance;

      expect(instance).to.be.equal('Number');
      expect(seconds).to.exist;
      expect(seconds).to.be.an('object');
      expect(seconds.type).to.be.a('function');
      expect(seconds.type.name).to.be.equal('Number');
      expect(seconds.index).to.be.true;
    });

    it('should have milliseconds field', function () {
      const milliseconds = DurationSchema.tree.milliseconds;
      const instance = DurationSchema.paths.milliseconds.instance;

      expect(instance).to.be.equal('Number');
      expect(milliseconds).to.exist;
      expect(milliseconds).to.be.an('object');
      expect(milliseconds.type).to.be.a('function');
      expect(milliseconds.type.name).to.be.equal('Number');
      expect(milliseconds.index).to.be.true;
      expect(milliseconds.required).to.be.true;
    });

    it('should have human field', function () {
      const human = DurationSchema.tree.human;
      const instance = DurationSchema.paths.human.instance;

      expect(instance).to.be.equal('String');
      expect(human).to.exist;
      expect(human).to.be.an('object');
      expect(human.type).to.be.a('function');
      expect(human.type.name).to.be.equal('String');
      expect(human.trim).to.be.true;
      expect(human.required).to.be.true;
    });
  });
});

'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('chai');

const ChangelogSchema = require(path.join(__dirname, '..', '..', 'lib', 'changelog.schema'));

describe('Changelog', function () {

  describe('Schema', function () {

    it('should have status field', function () {
      const status = ChangelogSchema.tree.status;
      const instance = ChangelogSchema.paths.status.instance;

      expect(instance).to.be.equal('ObjectID');
      expect(status).to.exist;
      expect(status).to.be.an('object');
      expect(status.type).to.be.a('function');
      expect(status.type.name).to.be.equal('ObjectId');
      expect(status.ref).to.be.equal('Status');
      expect(status.index).to.be.true;
      expect(status.autoset).to.be.true;
      expect(status.exists).to.be.true;
      expect(status.autopopulate).to.be.an('object');

    });

    it('should have priority field', function () {
      const priority = ChangelogSchema.tree.priority;
      const instance = ChangelogSchema.paths.priority.instance;

      expect(instance).to.be.equal('ObjectID');
      expect(priority).to.exist;
      expect(priority).to.be.an('object');
      expect(priority.type).to.be.a('function');
      expect(priority.type.name).to.be.equal('ObjectId');
      expect(priority.ref).to.be.equal('Priority');
      expect(priority.index).to.be.true;
      expect(priority.autoset).to.be.true;
      expect(priority.exists).to.be.true;
      expect(priority.autopopulate).to.be.an('object');
    });

    it('should have assignee field',function(){
      const assignee = ChangelogSchema.tree.assignee;
      const instance = ChangelogSchema.paths.assignee.instance;

      expect(instance).to.be.equal('ObjectID');
      expect(assignee).to.exist;
      expect(assignee).to.be.an('object');
      expect(assignee.type).to.be.a('function');
      expect(assignee.type.name).to.be.equal('ObjectId');
      expect(assignee.ref).to.be.equal('Party');
      expect(assignee.index).to.be.true;
      expect(assignee.autoset).to.be.true;
      expect(assignee.exists).to.be.true;
    });

    it('should have changer field',function(){
      const changer = ChangelogSchema.tree.changer;
      const instance = ChangelogSchema.paths.changer.instance;

      expect(instance).to.be.equal('ObjectID');
      expect(changer).to.exist;
      expect(changer).to.be.an('object');
      expect(changer.type).to.be.a('function');
      expect(changer.type.name).to.be.equal('ObjectId');
      expect(changer.ref).to.be.equal('Party');
      expect(changer.index).to.be.true;
      expect(changer.autoset).to.be.true;
      expect(changer.exists).to.be.true;
    });

    it('should have comment field',function(){
      const comment = ChangelogSchema.tree.comment;
      const instance = ChangelogSchema.paths.comment.instance;

      expect(instance).to.be.equal('String');
      expect(comment).to.exist;
      expect(comment).to.be.an('object');
      expect(comment.type).to.be.a('function');
      expect(comment.type.name).to.be.equal('String');
      expect(comment.index).to.be.true;
      expect(comment.trim).to.be.true;
      expect(comment.searchable).to.be.true;
    });

    it('should have shouldNotify field',function(){
      const shouldNotify = ChangelogSchema.tree.shouldNotify;
      const instance = ChangelogSchema.paths.shouldNotify.instance;

      expect(instance).to.be.equal('Boolean');
      expect(shouldNotify).to.exist;
      expect(shouldNotify).to.be.an('object');
      expect(shouldNotify.type).to.be.a('function');
      expect(shouldNotify.type.name).to.be.equal('Boolean');
      expect(shouldNotify.default).to.be.false;
    });

    it('should have wasNotificationSent field',function(){
      const wasNotificationSent = ChangelogSchema.tree.wasNotificationSent;
      const instance = ChangelogSchema.paths.wasNotificationSent.instance;

      expect(instance).to.be.equal('Boolean');
      expect(wasNotificationSent).to.exist;
      expect(wasNotificationSent).to.be.an('object');
      expect(wasNotificationSent.type).to.be.a('function');
      expect(wasNotificationSent.type.name).to.be.equal('Boolean');
      expect(wasNotificationSent.default).to.be.false;
    });

    it('should have visibility field',function(){
      const visibility = ChangelogSchema.tree.visibility;
      const instance = ChangelogSchema.paths.visibility.instance;

      expect(instance).to.be.equal('String');
      expect(visibility).to.exist;
      expect(visibility).to.be.an('object');
      expect(visibility.type).to.be.a('function');
      expect(visibility.type.name).to.be.equal('String');
      expect(visibility.index).to.be.true;
    });
  });
});
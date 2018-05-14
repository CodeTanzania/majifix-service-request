'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('chai');

const MediaSchema = require(path.join(__dirname, '..', '..', 'lib', 'media.schema'));

describe('Media', function () {

  describe('Schema', function () {

    it('should have uploadedAt field', function () {
      const uploadedAt = MediaSchema.tree.uploadedAt;
      const instance = MediaSchema.paths.uploadedAt.instance;

      expect(instance).to.be.equal('Date');
      expect(uploadedAt).to.exist;
      expect(uploadedAt).to.be.an('object');
      expect(uploadedAt.type).to.be.a('function');
      expect(uploadedAt.type.name).to.be.equal('Date');
      expect(uploadedAt.index).to.be.true;

    });

    it('should have name field', function () {

      const name = MediaSchema.tree.name;
      const instance = MediaSchema.paths.name.instance;

      expect(instance).to.be.equal('String');
      expect(name).to.exist;
      expect(name).to.be.an('object');
      expect(name.type).to.be.a('function');
      expect(name.type.name).to.be.equal('String');
      expect(name.index).to.be.true;
      expect(name.required).to.be.true;
    });

    it('should have caption field', function () {

      const caption = MediaSchema.tree.caption;
      const instance = MediaSchema.paths.caption.instance;

      expect(instance).to.be.equal('String');
      expect(caption).to.exist;
      expect(caption).to.be.an('object');
      expect(caption.type).to.be.a('function');
    });

    it('should have content field', function () {

      const content = MediaSchema.tree.content;
      const instance = MediaSchema.paths.content.instance;

      expect(instance).to.be.equal('String');
      expect(content).to.exist;
      expect(content).to.be.an('object');
      expect(content.type).to.be.a('function');
    });

    it('should have mime field', function () {

      const mime = MediaSchema.tree.mime;
      const instance = MediaSchema.paths.mime.instance;

      expect(instance).to.be.equal('String');
      expect(mime).to.exist;
      expect(mime).to.be.an('object');
      expect(mime.type).to.be.a('function');
      expect(mime.default).to.equal('image/png');
    });

    it('should have url field', function () {
      const url = MediaSchema.tree.url;
      const instance = MediaSchema.paths.url.instance;

      expect(instance).to.be.equal('String');
      expect(url).to.exist;
      expect(url).to.be.an('object');
      expect(url.type).to.be.a('function');
    });

    it('should have storage field', function () {
      const storage = MediaSchema.tree.storage;
      const instance = MediaSchema.paths.storage.instance;

      expect(instance).to.be.equal('String');
      expect(storage).to.exist;
      expect(storage).to.be.an('object');
      expect(storage.type).to.be.a('function');
    });
  });
});

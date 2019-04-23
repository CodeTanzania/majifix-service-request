'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('chai');

/* declarations */
const ServiceRequest = require(path.join(
  __dirname,
  '..',
  '..',
  'lib',
  'servicerequest.model'
));

describe('ServiceRequest', () => {
  describe('Statics', () => {
    it('should expose model name as constant', () => {
      expect(ServiceRequest.MODEL_NAME).to.exist;
      expect(ServiceRequest.MODEL_NAME).to.be.equal('ServiceRequest');
    });

    it('should expose autopulate as options', () => {
      expect(ServiceRequest.OPTION_AUTOPOPULATE).to.exist;
      expect(ServiceRequest.OPTION_AUTOPOPULATE).to.be.eql({
        select: {
          jurisdiction: 1,
          group: 1,
          service: 1,
          priority: 1,
          status: 1,
          code: 1,
          reporter: 1,
          location: 1,
        },
        maxDepth: 1,
      });
    });
  });
});

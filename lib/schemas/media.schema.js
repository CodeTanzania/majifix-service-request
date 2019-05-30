'use strict';

/* dependencies */
const { createSubSchema } = require('@lykmapipo/mongoose-common');

/* constants */
const STORAGE_LOCAL = 'Local';
const STORAGE_REMOTE = 'Remote';
const STORAGES = [STORAGE_LOCAL, STORAGE_REMOTE];
const SCHEMA_OPTIONS = { timestamps: true };

/**
 * @module Media
 * @name Media
 * @description An attachment or file associated with an entity
 * e.g service request
 *
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 *
 */
const Media = createSubSchema(
  {
    /**
     * @name uploadedAt
     * @description A time when a media uploaded
     *
     * @type {object}
     * @property {object} type - Schema(data) type
     * @property {date} default - default value
     * @property {boolean} index - ensure database index
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     */
    uploadedAt: {
      type: Date,
      default: new Date(),
      index: true,
    },

    /**
     * @name name
     * @description A human readable name of the media
     *
     * @type {object}
     * @property {object} type - Schema(data) type
     * @property {boolean} required - mark as required
     * @property {boolean} index - ensure database index
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     */
    name: {
      type: String,
      required: true,
      index: true,
    },

    /**
     * @name caption
     * @description A human readable caption for the media
     *
     * @type {object}
     * @property {object} type - Schema(data) type
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     */
    caption: {
      type: String,
    },

    /**
     * @name content
     * @description A base64 encode media content
     *
     * @type {object}
     * @property {object} type - Schema(data) type
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     */
    content: {
      type: String,
    },

    /**
     * @name mime
     * @description A format of the media
     *
     * @type {object}
     * @property {object} type - Schema(data) type
     * @property {string} default - default value
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     */
    mime: {
      type: String,
      default: 'image/png',
    },

    /**
     * @name url
     * @description A file path or remote url where a media is stored
     *
     * @type {object}
     * @property {object} type - Schema(data) type
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     */
    url: {
      type: String,
      // required: true
    },

    /**
     * @name storage
     * @description A store where a media can be found
     *              i.e Local, Remote, Google Drive, Dropbox etc
     *
     * @type {object}
     * @property {object} type - Schema(data) type
     * @property {string} default - default value
     * @property {array} enum - list of acceptable values
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     */
    storage: {
      type: String,
      default: STORAGE_LOCAL,
      enum: STORAGES,
    },
  },
  SCHEMA_OPTIONS
);

/* expose storage as statics */
Media.STORAGE_LOCAL = Media.statics.STORAGE_LOCAL = STORAGE_LOCAL;
Media.STORAGE_REMOTE = Media.statics.STORAGE_REMOTE = STORAGE_REMOTE;
Media.STORAGES = Media.statics.STORAGES = STORAGES;

/* export Media Schema */
module.exports = exports = Media;

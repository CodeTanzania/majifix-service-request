'use strict';


/**
 * @module MediaSchema
 * @name MediaSchema
 * @description An attachment or file associated with an entity
 *              e.g service request
 * @author lally elias <lallyelias87@mail.com>
 * @since 0.1.0
 * @version 0.1.0
 */


/* dependencies */
const { Schema } = require('mongoose');

/* media storage */
const STORAGE_LOCAL = 'Local';
const STORAGE_REMOTE = 'Remote';
const STORAGES = [
  STORAGE_LOCAL,
  STORAGE_REMOTE
];


/**
 * @name MediaSchema
 * @type {Schema}
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
const MediaSchema = new Schema({
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
    index: true
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
    index: true
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
    type: String
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
    type: String
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
    default: 'image/png'
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
    enum: STORAGES
  },

}, { timestamps: true });

//export constant
MediaSchema.STORAGE_LOCAL =
  MediaSchema.statics.STORAGE_LOCAL = STORAGE_LOCAL;

MediaSchema.STORAGE_REMOTE =
  MediaSchema.statics.STORAGE_REMOTE = STORAGE_REMOTE;

MediaSchema.STORAGES =
  MediaSchema.statics.STORAGES = STORAGES;

/* export Media Schema */
module.exports = exports = MediaSchema;

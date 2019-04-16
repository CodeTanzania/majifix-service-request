'use strict';


/**
 * @apiDefine ServiceRequest  ServiceRequest
 *
 * @apiDescription A representation of an issue(or service request)
 * reported by a civilian(or customer) e.g Water Leakage occur at
 * a particular area.
 *
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since  0.1.0
 * @version 0.1.0
 * @public
 */


/**
 * @apiDefine ServiceRequest
 * @apiSuccess {String} _id Unique service request identifier
 * @apiSuccess {String} [jurisdiction = undefined] jurisdiction under
 * which this service request belongs
 * @apiSuccess {Date} createdAt Date when service request was created
 * @apiSuccess {Date} updatedAt Date when service request was last updated
 *
 */


/**
 * @apiDefine ServiceRequests
 * @apiSuccess {Object[]} data List of service requests
 * @apiSuccess {String} data._id Unique service request identifier
 * @apiSuccess {String} [data.jurisdiction = undefined] jurisdiction under
 * which this service request belongs
 * @apiSuccess {Date} data.createdAt Date when service request was created
 * @apiSuccess {Date} data.updatedAt Date when service request was last updated
 * @apiSuccess {Number} total Total number of service request
 * @apiSuccess {Number} size Number of service request returned
 * @apiSuccess {Number} limit Query limit used
 * @apiSuccess {Number} skip Query skip/offset used
 * @apiSuccess {Number} page Page number
 * @apiSuccess {Number} pages Total number of pages
 * @apiSuccess {Date} lastModified Date and time at which latest service request
 * was last modified
 *
 */


/**
 * @apiDefine ServiceRequestSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 *    {
 *       "_id": "5aefff461e0a5527eb1955bd",
 *       "jurisdiction": {
 *         "_id": "5af2fe3ea937a3238bd8e64b",
 *         "code": "66514685",
 *         "name": "Gana"
 *       }
 *    }
 */


/**
 * @apiDefine ServiceRequestsSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "data": [
 *     {
 *       "_id": "5aefff461e0a5527eb1955bd",
 *       "jurisdiction": {
 *         "_id": "5af2fe3ea937a3238bd8e64b",
 *         "code": "66514685",
 *         "name": "Gana"
 *       }
 *    }
 *   ],
 *   "total": 10,
 *   "size": 1,
 *   "limit": 1,
 *   "skip": 0,
 *   "page": 1,
 *   "pages": 10,
 *   "lastModified": "2018-05-07T07:22:43.771Z"
 * }
 */


/**
 * @apiDefine JWTError
 * @apiError  JWTExpired Authorization token has expired
 */


/**
 * @apiDefine AuthorizationHeaderError
 * @apiError  AuthorizationHeaderRequired  Authorization header is required
 */


/**
 * @apiDefine AuthorizationHeaderErrorExample
 * @apiErrorExample   {json} Error-Response:
 *    HTTP/1.1 403 Forbidden
 *    {
 *      "success":false,
 *      "message :"Authorization header required",
 *      "error":{}
 *    }
 */


/**
 * @apiDefine JWTErrorExample
 * @apiErrorExample  {json}   Error-Response:
 *    HTTP/1.1 403 Forbidden
 *    {
 *      "success":false,
 *      "message :"jwt expired",
 *      "error":{}
 *    }
 */


/**
 * @apiDefine ServiceRequestRequestHeader
 * @apiHeader {String} [Accept=application/json] Accepted content type
 * @apiHeader {String} Authorization Authorization token
 * @apiHeader {String} [Accept-Encoding='gzip, deflate'] Accepted encoding type
 */


/**
 * @apiDefine ServiceRequestRequestHeaderExample
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     "Accept": "application/json"
 *     "Authorization": "Bearer ey6utFreRdy5"
 *     "Accept-Encoding": "gzip, deflate"
 *   }
 */



/* dependencies */
const path = require('path');
const _ = require('lodash');
const { env } = require('@codetanzania/majifix-common');
const Router = require('@lykmapipo/express-common').Router;


/* local constants */
const { API_VERSION } = env;
const PATH_LIST = '/servicerequests';
const PATH_SINGLE = '/servicerequests/:id';
const PATH_JURISDICTION = '/jurisdictions/:jurisdiction/servicerequests';


/* declarations */
const ServiceRequest = require(path.join(__dirname, 'servicerequest.model'));
const router = new Router({
  version: API_VERSION
});



/**
 * @api {get} /servicerequests List Service Requests
 * @apiVersion 0.1.0
 * @apiName GetServiceRequests
 * @apiGroup ServiceRequest
 * @apiDescription Returns a list of service requests
 * @apiUse ServiceRequestRequestHeader
 * @apiUse ServiceRequests
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-service-request.herokuapp.com/v0.1.0/servicerequests
 *
 * @apiUse ServiceRequestRequestHeaderExample
 * @apiUse ServiceRequestsSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_LIST, function getServiceRequests(request, response, next) {

  //obtain request options
  const options = _.merge({}, request.mquery);

  ServiceRequest
    .get(options, function onGetServiceRequests(error, results) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(results);
      }

    });

});



/**
 * @api {post} /servicerequests Create New Service Request
 * @apiVersion 0.1.0
 * @apiName PostServiceRequest
 * @apiGroup ServiceRequest
 * @apiDescription Create new service request
 * @apiUse ServiceRequestRequestHeader
 * @apiUse ServiceRequest
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-service-request.herokuapp.com/v0.1.0/servicerequests
 *
 * @apiUse ServiceRequestRequestHeaderExample
 * @apiUse ServiceRequestSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.post(PATH_LIST, function postServiceRequest(request, response, next) {

  //obtain request body
  const body = _.merge({}, request.body);

  ServiceRequest
    .post(body, function onPostServiceRequest(error, created) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(201);
        response.json(created);
      }

    });

});



/**
 * @api {get} /servicerequests/:id Get Existing Service Request
 * @apiVersion 0.1.0
 * @apiName GetServiceRequest
 * @apiGroup ServiceRequest
 * @apiDescription Get existing service request
 * @apiUse ServiceRequestRequestHeader
 * @apiUse ServiceRequest
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-service-request.herokuapp.com/v0.1.0/servicerequests
 *
 * @apiUse ServiceRequestRequestHeaderExample
 * @apiUse ServiceRequestSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_SINGLE, function getServiceRequest(request, response, next) {

  //obtain request options
  const options = _.merge({}, request.mquery);

  //obtain service request id
  options._id = request.params.id;

  ServiceRequest
    .getById(options, function onGetServiceRequest(error, found) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(found);
      }

    });

});


/**
 * @api {patch} /servicerequests/:id Patch Existing Service Request
 * @apiVersion 0.1.0
 * @apiName PatchServiceRequest
 * @apiGroup ServiceRequest
 * @apiDescription Patch existing service request
 * @apiUse ServiceRequestRequestHeader
 * @apiUse ServiceRequest
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-service-request.herokuapp.com/v0.1.0/servicerequests
 *
 * @apiUse ServiceRequestRequestHeaderExample
 * @apiUse ServiceRequestSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.patch(PATH_SINGLE, function patchServiceRequest(request, response, next) {

  //obtain service request id
  const { id } = request.params;

  //obtain request body
  const patches = _.merge({}, request.body);

  ServiceRequest
    .patch(id, patches, function onPatchServiceRequest(error, patched) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(patched);
      }

    });

});



/**
 * @api {put} /servicerequests/:id Put Existing Service Request
 * @apiVersion 0.1.0
 * @apiName PutServiceRequest
 * @apiGroup ServiceRequest
 * @apiDescription Put existing service request
 * @apiUse ServiceRequestRequestHeader
 * @apiUse ServiceRequest
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-service-request.herokuapp.com/v0.1.0/servicerequests
 *
 * @apiUse ServiceRequestRequestHeaderExample
 * @apiUse ServiceRequestSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.put(PATH_SINGLE, function putServiceRequest(request, response, next) {

  //obtain service request id
  const { id } = request.params.id;

  //obtain request body
  const updates = _.merge({}, request.body);

  ServiceRequest
    .put(id, updates, function onPutServiceRequest(error, updated) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(updated);
      }

    });

});



/**
 * @api {delete} /servicerequests/:id Delete Existing Service Request
 * @apiVersion 0.1.0
 * @apiName DeleteServiceRequest
 * @apiGroup ServiceRequest
 * @apiDescription Delete existing service request
 * @apiUse ServiceRequestRequestHeader
 * @apiUse ServiceRequest
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-service-request.herokuapp.com/v0.1.0/servicerequests
 *
 * @apiUse ServiceRequestRequestHeaderExample
 * @apiUse ServiceRequestSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.delete(PATH_SINGLE, function deleteServiceRequest(request, response,
  next) {

  //obtain service request id
  const { id } = request.params;

  ServiceRequest
    .del(id, function onDeleteServiceRequest(error, deleted) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(deleted);
      }

    });

});



/**
 * @api {get} /jurisdictions/:jurisdiction/servicerequests List Jurisdiction Service Requests
 * @apiVersion 0.1.0
 * @apiName GetJurisdictionServiceRequests
 * @apiGroup ServiceRequest
 * @apiDescription Returns a list of servicerequests of specified jurisdiction
 * @apiUse ServiceRequestRequestHeader
 * @apiUse ServiceRequests
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-service-request.herokuapp.com/v0.1.0/servicerequests
 *
 * @apiUse ServiceRequestRequestHeaderExample
 * @apiUse ServiceRequestsSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_JURISDICTION, function getServiceRequests(request, response,
  next) {

  //obtain request options
  const { jurisdiction } = request.params;
  const filter =
    (jurisdiction ? { filter: { jurisdiction: jurisdiction } } : {}); //TODO support parent and no jurisdiction
  const options =
    _.merge({}, filter, request.mquery);


  ServiceRequest
    .get(options, function onGetServiceRequests(error, found) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(found);
      }

    });

});



/* expose router */
module.exports = router;

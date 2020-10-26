import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Clients, { schema } from './model'

const router = new Router()
const { type, name, createDate, address, INN } = schema.tree

/**
 * @api {post} /clients Create clients
 * @apiName CreateClients
 * @apiGroup Clients
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam type Clients's type.
 * @apiParam name Clients's name.
 * @apiParam createDate Clients's createDate.
 * @apiParam address Clients's address.
 * @apiParam INN Clients's INN.
 * @apiSuccess {Object} clients Clients's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Clients not found.
 * @apiError 401 user access only.
 */
router.post('/',
  master(),
  body({ type, name, createDate, address, INN }),
  create)
// token({ required: true }),

/**
 * @api {get} /clients Retrieve clients
 * @apiName RetrieveClients
 * @apiGroup Clients
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} clients List of clients.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /clients/:id Retrieve clients
 * @apiName RetrieveClients
 * @apiGroup Clients
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} clients Clients's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Clients not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /clients/:id Update clients
 * @apiName UpdateClients
 * @apiGroup Clients
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam type Clients's type.
 * @apiParam name Clients's name.
 * @apiParam createDate Clients's createDate.
 * @apiParam address Clients's address.
 * @apiParam INN Clients's INN.
 * @apiSuccess {Object} clients Clients's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Clients not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  master(),
  body({ type, name, createDate, address, INN }),
  update)

/**
 * @api {delete} /clients/:id Delete clients
 * @apiName DeleteClients
 * @apiGroup Clients
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Clients not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router

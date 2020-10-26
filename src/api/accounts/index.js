import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Accounts, { schema } from './model'

const router = new Router()
const { balance, owner, openDate, status } = schema.tree

/**
 * @api {post} /accounts Create accounts
 * @apiName CreateAccounts
 * @apiGroup Accounts
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam accountId Accounts's accountId.
 * @apiParam owner Accounts's owner.
 * @apiParam openDate Accounts's openDate.
 * @apiParam status Accounts's status.
 * @apiSuccess {Object} accounts Accounts's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Accounts not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ owner, openDate, balance, status }),
  create)

/**
 * @api {get} /accounts Retrieve accounts
 * @apiName RetrieveAccounts
 * @apiGroup Accounts
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} accounts List of accounts.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /accounts/:id Retrieve accounts
 * @apiName RetrieveAccounts
 * @apiGroup Accounts
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} accounts Accounts's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Accounts not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /accounts/:id Update accounts
 * @apiName UpdateAccounts
 * @apiGroup Accounts
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam accountId Accounts's accountId.
 * @apiParam owner Accounts's owner.
 * @apiParam openDate Accounts's openDate.
 * @apiParam status Accounts's status.
 * @apiSuccess {Object} accounts Accounts's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Accounts not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ owner, openDate, balance, status }),
  update)

/**
 * @api {delete} /accounts/:id Delete accounts
 * @apiName DeleteAccounts
 * @apiGroup Accounts
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Accounts not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router

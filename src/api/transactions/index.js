import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Transactions, { schema } from './model'

const router = new Router()
const { outAccount, inAccount, amount, date } = schema.tree

/**
 * @api {post} /transactions Create transactions
 * @apiName CreateTransactions
 * @apiGroup Transactions
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam outNumber Transactions's outNumber.
 * @apiParam inNumber Transactions's inNumber.
 * @apiParam amount Transactions's amount.
 * @apiParam date Transactions's date.
 * @apiSuccess {Object} transactions Transactions's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Transactions not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ outAccount, inAccount, amount, date }),
  create)

/**
 * @api {get} /transactions Retrieve transactions
 * @apiName RetrieveTransactions
 * @apiGroup Transactions
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} transactions List of transactions.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /transactions/:id Retrieve transactions
 * @apiName RetrieveTransactions
 * @apiGroup Transactions
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} transactions Transactions's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Transactions not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /transactions/:id Update transactions
 * @apiName UpdateTransactions
 * @apiGroup Transactions
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam outNumber Transactions's outNumber.
 * @apiParam inNumber Transactions's inNumber.
 * @apiParam amount Transactions's amount.
 * @apiParam date Transactions's date.
 * @apiSuccess {Object} transactions Transactions's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Transactions not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ outAccount, inAccount, amount, date }),
  update)

/**
 * @api {delete} /transactions/:id Delete transactions
 * @apiName DeleteTransactions
 * @apiGroup Transactions
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Transactions not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router

import { success, notFound } from '../../services/response/'
import { Transactions } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Transactions.create(body)
    .then((transactions) => transactions.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Transactions.find(query, select, cursor)
    .then((transactions) => transactions.map((transactions) => transactions.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Transactions.findById(params.id)
    .then(notFound(res))
    .then((transactions) => transactions ? transactions.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Transactions.findById(params.id)
    .then(notFound(res))
    .then((transactions) => transactions ? Object.assign(transactions, body).save() : null)
    .then((transactions) => transactions ? transactions.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Transactions.findById(params.id)
    .then(notFound(res))
    .then((transactions) => transactions ? transactions.remove() : null)
    .then(success(res, 204))
    .catch(next)

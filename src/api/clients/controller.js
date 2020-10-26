import { success, notFound } from '../../services/response/'
import { Clients } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Clients.create(body)
    .then((clients) => clients.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Clients.find(query, select, cursor)
    .then((clients) => clients.map((clients) => clients.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Clients.findById(params.id)
    .then(notFound(res))
    .then((clients) => clients ? clients.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Clients.findById(params.id)
    .then(notFound(res))
    .then((clients) => clients ? Object.assign(clients, body).save() : null)
    .then((clients) => clients ? clients.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Clients.findById(params.id)
    .then(notFound(res))
    .then((clients) => clients ? clients.remove() : null)
    .then(success(res, 204))
    .catch(next)

import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Transactions } from '.'

const app = () => express(apiRoot, routes)

let transactions

beforeEach(async () => {
  transactions = await Transactions.create({})
})

test('POST /transactions 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, outNumber: 'test', inNumber: 'test', amount: 'test', date: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.outNumber).toEqual('test')
  expect(body.inNumber).toEqual('test')
  expect(body.amount).toEqual('test')
  expect(body.date).toEqual('test')
})

test('POST /transactions 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /transactions 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /transactions 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /transactions/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${transactions.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(transactions.id)
})

test('GET /transactions/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${transactions.id}`)
  expect(status).toBe(401)
})

test('GET /transactions/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /transactions/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${transactions.id}`)
    .send({ access_token: masterKey, outNumber: 'test', inNumber: 'test', amount: 'test', date: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(transactions.id)
  expect(body.outNumber).toEqual('test')
  expect(body.inNumber).toEqual('test')
  expect(body.amount).toEqual('test')
  expect(body.date).toEqual('test')
})

test('PUT /transactions/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${transactions.id}`)
  expect(status).toBe(401)
})

test('PUT /transactions/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, outNumber: 'test', inNumber: 'test', amount: 'test', date: 'test' })
  expect(status).toBe(404)
})

test('DELETE /transactions/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${transactions.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /transactions/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${transactions.id}`)
  expect(status).toBe(401)
})

test('DELETE /transactions/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Accounts } from '.'

const app = () => express(apiRoot, routes)

let accounts

beforeEach(async () => {
  accounts = await Accounts.create({})
})

test('POST /accounts 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, accountId: 'test', owner: 'test', openDate: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.accountId).toEqual('test')
  expect(body.owner).toEqual('test')
  expect(body.openDate).toEqual('test')
  expect(body.status).toEqual('test')
})

test('POST /accounts 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /accounts 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /accounts 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /accounts/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${accounts.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(accounts.id)
})

test('GET /accounts/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${accounts.id}`)
  expect(status).toBe(401)
})

test('GET /accounts/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /accounts/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${accounts.id}`)
    .send({ access_token: masterKey, accountId: 'test', owner: 'test', openDate: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(accounts.id)
  expect(body.accountId).toEqual('test')
  expect(body.owner).toEqual('test')
  expect(body.openDate).toEqual('test')
  expect(body.status).toEqual('test')
})

test('PUT /accounts/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${accounts.id}`)
  expect(status).toBe(401)
})

test('PUT /accounts/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, accountId: 'test', owner: 'test', openDate: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /accounts/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${accounts.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /accounts/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${accounts.id}`)
  expect(status).toBe(401)
})

test('DELETE /accounts/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

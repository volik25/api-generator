import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Clients } from '.'

const app = () => express(apiRoot, routes)

let userSession, clients

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  clients = await Clients.create({})
})

test('POST /clients 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, type: 'test', name: 'test', createDate: 'test', address: 'test', INN: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.type).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.createDate).toEqual('test')
  expect(body.address).toEqual('test')
  expect(body.INN).toEqual('test')
})

test('POST /clients 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /clients 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /clients 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /clients/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${clients.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(clients.id)
})

test('GET /clients/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${clients.id}`)
  expect(status).toBe(401)
})

test('GET /clients/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /clients/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${clients.id}`)
    .send({ access_token: userSession, type: 'test', name: 'test', createDate: 'test', address: 'test', INN: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(clients.id)
  expect(body.type).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.createDate).toEqual('test')
  expect(body.address).toEqual('test')
  expect(body.INN).toEqual('test')
})

test('PUT /clients/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${clients.id}`)
  expect(status).toBe(401)
})

test('PUT /clients/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: userSession, type: 'test', name: 'test', createDate: 'test', address: 'test', INN: 'test' })
  expect(status).toBe(404)
})

test('DELETE /clients/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${clients.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /clients/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${clients.id}`)
  expect(status).toBe(401)
})

test('DELETE /clients/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

import { Clients } from '.'

let clients

beforeEach(async () => {
  clients = await Clients.create({ type: 'test', name: 'test', createDate: 'test', address: 'test', INN: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = clients.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(clients.id)
    expect(view.type).toBe(clients.type)
    expect(view.name).toBe(clients.name)
    expect(view.createDate).toBe(clients.createDate)
    expect(view.address).toBe(clients.address)
    expect(view.INN).toBe(clients.INN)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = clients.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(clients.id)
    expect(view.type).toBe(clients.type)
    expect(view.name).toBe(clients.name)
    expect(view.createDate).toBe(clients.createDate)
    expect(view.address).toBe(clients.address)
    expect(view.INN).toBe(clients.INN)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

import { Accounts } from '.'

let accounts

beforeEach(async () => {
  accounts = await Accounts.create({ accountId: 'test', owner: 'test', openDate: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = accounts.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(accounts.id)
    expect(view.accountId).toBe(accounts.accountId)
    expect(view.owner).toBe(accounts.owner)
    expect(view.openDate).toBe(accounts.openDate)
    expect(view.status).toBe(accounts.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = accounts.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(accounts.id)
    expect(view.accountId).toBe(accounts.accountId)
    expect(view.owner).toBe(accounts.owner)
    expect(view.openDate).toBe(accounts.openDate)
    expect(view.status).toBe(accounts.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

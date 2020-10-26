import { Transactions } from '.'

let transactions

beforeEach(async () => {
  transactions = await Transactions.create({ outNumber: 'test', inNumber: 'test', amount: 'test', date: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = transactions.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(transactions.id)
    expect(view.outNumber).toBe(transactions.outNumber)
    expect(view.inNumber).toBe(transactions.inNumber)
    expect(view.amount).toBe(transactions.amount)
    expect(view.date).toBe(transactions.date)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = transactions.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(transactions.id)
    expect(view.outNumber).toBe(transactions.outNumber)
    expect(view.inNumber).toBe(transactions.inNumber)
    expect(view.amount).toBe(transactions.amount)
    expect(view.date).toBe(transactions.date)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

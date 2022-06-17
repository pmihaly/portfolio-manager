import { Event } from '@portfolio-manager/event'
import { calculateGrossPLSinceStart } from './calculate-gross-pl-since-start'

describe('calculateGrossPLSinceStart', () => {
  it('should calculate P&L for an account', () => {
    const events: Event[] = [
      {
        date: new Date('2020-01-01'),
        kind: 'report',
        details: {
          account: 'account1',
          currentBalance: 100,
        },
      },
      {
        date: new Date('2020-01-02'),
        kind: 'report',
        details: {
          account: 'account1',
          currentBalance: 200,
        },
      },
    ]

    expect(calculateGrossPLSinceStart(events)).toEqual({
      account1: 100,
    })
  })

  it('should calculate P&L for all accounts', () => {
    const events: Event[] = [
      {
        date: new Date('2020-01-01'),
        kind: 'report',
        details: {
          account: 'account1',
          currentBalance: 100,
        },
      },
      {
        date: new Date('2020-01-01'),
        kind: 'report',
        details: {
          account: 'account2',
          currentBalance: 100,
        },
      },
      {
        date: new Date('2020-01-02'),
        kind: 'report',
        details: {
          account: 'account1',
          currentBalance: 200,
        },
      },
      {
        date: new Date('2020-01-01'),
        kind: 'report',
        details: {
          account: 'account2',
          currentBalance: 50,
        },
      },
    ]

    expect(calculateGrossPLSinceStart(events)).toEqual({
      account1: 100,
      account2: -50,
    })
  })
})

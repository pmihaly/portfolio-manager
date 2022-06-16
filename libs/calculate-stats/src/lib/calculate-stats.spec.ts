import { Event } from '@portfolio-manager-v2/event'
import { map } from 'fp-ts/lib/ReadonlyRecord'
import { calculateStats, statisticCalculators } from './calculate-stats'

describe('calculateStats', () => {
  it('should use correct stats', () => {
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

    const statCalculators = map(
      (
        calculatorFn: typeof statisticCalculators[keyof typeof statisticCalculators]
      ) => jest.fn(calculatorFn)
    )(statisticCalculators)

    calculateStats(statCalculators)(['gross-pl-since-start'])(events)

    expect(statCalculators['gross-pl-since-start']).toHaveBeenCalledWith(events)
  })
})

import { D } from '@mobily/ts-belt'
import { Event } from '@portfolio-manager-v2/event'
import { calculateStats } from './calculate-stats'
import { statisticCalculators } from './stats/statistic-calculators'

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

    const statCalculators = D.map(statisticCalculators, (calculatorFn) =>
      jest.fn(calculatorFn)
    )

    calculateStats(statCalculators)(['gross-pl-since-start'])(events)

    expect(statCalculators['gross-pl-since-start']).toHaveBeenCalledWith(events)
  })
})

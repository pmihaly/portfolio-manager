import { Event, playEvents, ReportEvent } from '.'

const stubEventFactory = (): ReportEvent => ({
  date: new Date('2019-01-01'),
  kind: 'report',
  details: {
    account: 'test account',
    currentBalance: 200.0,
  },
})

describe('play events', () => {
  it('should derive a state from the events', () => {
    const eventStore: Event[] = [...Array(10).keys()].map(stubEventFactory)

    const accountBalanceReducer =
      (currentBalance: number) =>
      ({ details: { currentBalance: eventCurrentBalance } }: Event) =>
        currentBalance + eventCurrentBalance

    const sumOfAccountBalances = playEvents({ reducer: accountBalanceReducer })(
      { initialState: 0 }
    )({ events: eventStore })

    expect(sumOfAccountBalances).toEqual(200.0 * 10)
  })
})

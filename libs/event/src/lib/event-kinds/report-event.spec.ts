import { Event } from '..'
import { isReportEvent } from '.'

describe('isReportEvent', () => {
  it('should return true if the event is a report event', () => {
    const event: Event = {
      date: new Date('2020-01-01'),
      kind: 'report',
      details: {
        account: '0x123',
        currentBalance: 200.0,
      },
    }

    expect(isReportEvent(event)).toBe(true)
  })

  it('should return false if the event is not a report event', () => {
    const event = {
      date: new Date('2020-01-01'),
      kind: 'deposit',
      details: {
        account: '0x123',
        currentBalance: 200.0,
      },
    } as unknown as Event

    expect(isReportEvent(event)).toBe(false)
  })
})

import { D } from '@mobily/ts-belt'
import { Event } from '@portfolio-manager-v2/event'
import { statisticCalculators } from './stats/statistic-calculators'

export const calculateStats =
  (statFns = statisticCalculators) =>
  (requestedStatKeys: Array<keyof typeof statisticCalculators>) =>
  (events: Event[]) =>
    D.mapWithKey(statFns, (statKey, fn) =>
      requestedStatKeys.includes(statKey) ? fn(events) : undefined
    )

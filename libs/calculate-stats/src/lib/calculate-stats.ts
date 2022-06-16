import { Event } from '@portfolio-manager-v2/event'
import { none } from 'fp-ts/lib/Option'
import { mapWithIndex } from 'fp-ts/lib/ReadonlyRecord'
import { calculateGrossPLSinceStart } from './statistic-calculators'

export const statisticCalculators = {
  'gross-pl-since-start': calculateGrossPLSinceStart,
}

export const calculateStats =
  (statFns = statisticCalculators) =>
  (requestedStatKeys: Array<keyof typeof statisticCalculators>) =>
  (events: Event[]) =>
    mapWithIndex(
      (
        statKey: keyof typeof statFns,
        fn: typeof statFns[keyof typeof statFns]
      ) => (requestedStatKeys.includes(statKey) ? fn(events) : none)
    )(statFns)

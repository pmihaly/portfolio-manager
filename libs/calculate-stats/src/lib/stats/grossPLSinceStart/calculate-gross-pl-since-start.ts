import { isReportEvent, ReportEvent } from '@portfolio-manager-v2/event'
import { filter } from 'fp-ts/lib/Array'
import { flow, pipe } from 'fp-ts/lib/function'
import { groupBy, head, last } from 'fp-ts/lib/NonEmptyArray'
import { map } from 'fp-ts/lib/ReadonlyRecord'

const calculateProfitLoss = ({
  startingBalance,
  endingBalance,
}: {
  startingBalance: number
  endingBalance: number
}): number => endingBalance - startingBalance

const getAccount = ({
  details: { account },
}: ReportEvent): ReportEvent['details']['account'] => account

const getBalance = ({
  details: { currentBalance },
}: ReportEvent): ReportEvent['details']['currentBalance'] => currentBalance

export const calculateGrossPLSinceStart = flow(
  filter(isReportEvent),
  groupBy(getAccount),
  map((reports) =>
    calculateProfitLoss({
      startingBalance: pipe(reports, head, getBalance),
      endingBalance: pipe(reports, last, getBalance),
    })
  )
)

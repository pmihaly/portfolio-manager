import { A, D, F, flow, O, pipe } from '@mobily/ts-belt'
import { isReportEvent, ReportEvent } from '@portfolio-manager-v2/event'

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


const getBalanceOrZero = F.ifElse(
  O.isNone,
  () => 0,
  (reportEvent: O.Option<ReportEvent>) =>
    pipe(
      reportEvent,
      O.getExn,
      getBalance,
    )
)

export const calculateGrossPLSinceStart = flow(
  A.filter(isReportEvent),
  A.groupBy(getAccount),
  D.map((reports) =>
        !reports ? 0 :
      calculateProfitLoss({
        startingBalance: pipe(reports, A.head, getBalanceOrZero),
        endingBalance: pipe(reports, A.last, getBalanceOrZero),
      })
    )
  )

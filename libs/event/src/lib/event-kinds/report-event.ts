import { Event, EventMetadata } from '..'

export type ReportEventDetails = {
  account: string
  currentBalance: number
}

export type ReportEvent = EventMetadata & { details: ReportEventDetails }

export const isReportEvent = (event: Event): event is ReportEvent =>
  event.kind === 'report'

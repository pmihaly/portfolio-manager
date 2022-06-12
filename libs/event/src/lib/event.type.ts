import { EventKinds } from '.'

export type DateTimeable = {
  date: Date
}

export type EventKindable = {
  kind: keyof EventKinds
}

export type EventDetailable = {
  details: EventKinds[keyof EventKinds]
}

export type EventMetadata = DateTimeable & EventKindable

export type Event = EventMetadata & EventDetailable

import { Event } from './event.type'

export const playEvents =
  <TState>({
    reducer,
  }: {
    reducer: (state: TState) => (event: Event) => TState
  }) =>
  ({ initialState }: { initialState: TState }) =>
  ({ events }: { events: Event[] }) =>
    events.reduce<TState>((acc, curr) => reducer(acc)(curr), initialState)

import { createMachine } from 'xstate';

enum State {
  CLOSED = 'CLOSED',
  OPENED = 'OPENED',
}

enum Event {
  CLOSE = 'CLOSE',
  OPEN = 'OPEN',
}

const popoverMachine = createMachine({
  initial: State.CLOSED,
  states: {
    [State.CLOSED]: {
      on: {
        [Event.OPEN]: { target: State.OPENED },
      },
    },
    [State.OPENED]: {
      on: {
        [Event.CLOSE]: { target: State.CLOSED },
      },
    },
  },
});
export { popoverMachine, State as POPOVER_STATE, Event as POPOVER_EVENT };

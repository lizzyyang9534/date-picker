import { DateData } from './../../types';
import { createMachine, assign } from 'xstate';

enum State {
  DATE_VIEW = 'DATE_VIEW',
  MONTH_VIEW = 'MONTH_VIEW',
  YEAR_VIEW = 'YEAR_VIEW',
}

enum Event {
  SWITCH_DATE_VIEW = 'SWITCH_DATE_VIEW',
  SELECT_MONTH = 'SELECT_MONTH',
  SWITCH_MONTH_VIEW = 'SWITCH_MONTH_VIEW',
  SELECT_YEAR = 'SELECT_YEAR',
  SWITCH_YEAR_VIEW = 'SWITCH_YEAR_VIEW',
}

type DatePickerContext = {
  selectedDate?: Date | string;
  defaultDate: Date;
  dates: DateData[];
  month: number;
  year: number;
};

const NOW = new Date();

const datePickerMachine = createMachine<DatePickerContext>(
  {
    initial: State.DATE_VIEW,
    context: {
      defaultDate: NOW,
      dates: [],
      month: NOW.getMonth(),
      year: NOW.getFullYear(),
    },
    entry: ['convertSelectedDate', 'assignDefaultDate', 'assignDates'],
    states: {
      [State.DATE_VIEW]: {
        on: {
          [Event.SWITCH_MONTH_VIEW]: {
            target: State.MONTH_VIEW,
          },
        },
      },
      [State.MONTH_VIEW]: {
        on: {
          [Event.SELECT_MONTH]: {
            target: State.DATE_VIEW,
            actions: ['assignMonth'],
          },
          [Event.SWITCH_YEAR_VIEW]: {
            target: State.YEAR_VIEW,
          },
        },
      },
      [State.YEAR_VIEW]: {
        on: {
          [Event.SELECT_YEAR]: {
            target: State.MONTH_VIEW,
            actions: ['assignYear'],
          },
          [Event.SWITCH_YEAR_VIEW]: {
            target: State.YEAR_VIEW,
          },
        },
      },
    },
  },
  {
    actions: {
      convertSelectedDate: assign({
        defaultDate: ({ defaultDate: selectedDate }) =>
          typeof selectedDate === 'string'
            ? new Date(selectedDate)
            : typeof selectedDate === 'object'
            ? selectedDate
            : new Date(),
      }),
      assignDefaultDate: assign(({ defaultDate: selectedDate }) => {
        const date = selectedDate || new Date();
        return {
          defaultDate: date,
          month: date.getMonth(),
          year: date.getFullYear(),
        };
      }),
      // assignDates: assign(() => {
      //   return { dates: [] };
      // }),
      assignMonth: assign({
        month: (_, event) => event.month,
      }),
      assignYear: assign({
        year: (_, event) => event.data,
      }),
    },
  }
);
export {
  datePickerMachine,
  State as DATE_PICKER_STATE,
  Event as DATE_PICKER_EVENT,
};

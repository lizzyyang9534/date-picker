import { createMachine, assign } from 'xstate';
import * as R from 'ramda';
import { getDisplayDates } from './utils';

enum State {
  INIT = 'INIT',
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
  dates: number[];
  month: number;
  year: number;
  years: number[];
};

const NOW = new Date();

const datePickerMachine = createMachine<DatePickerContext>(
  {
    context: {
      defaultDate: NOW,
      dates: [],
      month: NOW.getMonth(),
      year: NOW.getFullYear(),
      years: [],
    },
    entry: ['assignDefaultDate', 'assignMonthAndYear', 'assignDates'],
    initial: State.DATE_VIEW,
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
            actions: ['assignMonth', 'assignDates'],
          },
          [Event.SWITCH_YEAR_VIEW]: {
            target: State.YEAR_VIEW,
            actions: ['assignYears'],
          },
        },
      },
      [State.YEAR_VIEW]: {
        on: {
          [Event.SELECT_YEAR]: {
            target: State.MONTH_VIEW,
            actions: ['assignYear'],
          },
        },
      },
    },
  },
  {
    actions: {
      assignDefaultDate: assign({
        defaultDate: ({ selectedDate }) =>
          typeof selectedDate === 'string'
            ? new Date(selectedDate)
            : typeof selectedDate === 'object'
            ? selectedDate
            : new Date(),
      }),
      assignMonthAndYear: assign({
        month: ({ defaultDate }) => defaultDate.getMonth(),
        year: ({ defaultDate }) => defaultDate.getFullYear(),
      }),
      assignDates: assign({
        dates: ({ month, year }) => {
          const dates = getDisplayDates(month, year, 42);
          console.log(dates);

          return dates;
        },
      }),
      assignMonth: assign({
        month: (_, event) => {
          console.log(event.month);
          return event.month;
        },
      }),
      assignYear: assign({
        year: (_, event) => event.year,
      }),
      assignYears: assign({
        years: ({ year }) => {
          const startYear = year - (year % 10);
          return R.range(startYear - 1, startYear + 11);
        },
      }),
    },
  }
);
export {
  datePickerMachine,
  State as DATE_PICKER_STATE,
  Event as DATE_PICKER_EVENT,
};

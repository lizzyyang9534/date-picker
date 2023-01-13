import { createMachine, assign } from 'xstate';
import { getDisplayDates, getLastMonth, getNextMonth } from './utils';
import { range } from '../../utils/list';

enum State {
  DATE_VIEW = 'DATE_VIEW',
  MONTH_VIEW = 'MONTH_VIEW',
  YEAR_VIEW = 'YEAR_VIEW',
}

enum Event {
  SELECT_DATE = 'SELECT_DATE',
  SWITCH_DATE_VIEW = 'SWITCH_DATE_VIEW',
  SELECT_MONTH = 'SELECT_MONTH',
  SWITCH_MONTH_VIEW = 'SWITCH_MONTH_VIEW',
  SELECT_YEAR = 'SELECT_YEAR',
  SWITCH_YEAR_VIEW = 'SWITCH_YEAR_VIEW',
  PREVIOUS = 'PREVIOUS',
  NEXT = 'NEXT',
  UPDATE_SELECTED_DATE = 'UPDATE_SELECTED_DATE',
}

type DatePickerContext = {
  initialDate?: Date | string;
  defaultDate: Date;
  selectedDate: Date | null;
  dates: Date[];
  month: number;
  year: number;
  years: number[];
};

const NOW = new Date();

const datePickerMachine = createMachine<DatePickerContext>(
  {
    context: {
      defaultDate: NOW,
      selectedDate: null,
      dates: [],
      month: NOW.getMonth(),
      year: NOW.getFullYear(),
      years: [],
    },
    entry: ['assignDefaultDate', 'assignDefaultMonthAndYear', 'assignDates'],
    initial: State.DATE_VIEW,
    states: {
      [State.DATE_VIEW]: {
        on: {
          [Event.SELECT_DATE]: {
            actions: ['assignSelectedDate', 'triggerOnSelect'],
          },
          [Event.SWITCH_MONTH_VIEW]: {
            target: State.MONTH_VIEW,
          },
          [Event.PREVIOUS]: {
            actions: ['goLastMonth', 'assignDates'],
          },
          [Event.NEXT]: {
            actions: ['goNextMonth', 'assignDates'],
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
          [Event.PREVIOUS]: {
            actions: ['goLastYear', 'assignDates'],
          },
          [Event.NEXT]: {
            actions: ['goNextYear', 'assignDates'],
          },
        },
      },
      [State.YEAR_VIEW]: {
        on: {
          [Event.SELECT_YEAR]: {
            target: State.MONTH_VIEW,
            actions: ['assignYear'],
          },
          [Event.PREVIOUS]: {
            actions: ['goLastDecade'],
          },
          [Event.NEXT]: {
            actions: ['goNextDecade'],
          },
        },
      },
    },
    on: {
      [Event.UPDATE_SELECTED_DATE]: {
        actions: ['assignSelectedDate', 'updateMonthAndYear', 'assignDates'],
      },
    },
  },
  {
    actions: {
      assignDefaultDate: assign({
        defaultDate: ({ initialDate }) =>
          typeof initialDate === 'string'
            ? new Date(initialDate)
            : typeof initialDate === 'object'
            ? initialDate
            : new Date(),
      }),
      assignDefaultMonthAndYear: assign({
        month: ({ defaultDate }) => defaultDate.getMonth(),
        year: ({ defaultDate }) => defaultDate.getFullYear(),
      }),
      assignSelectedDate: assign({
        selectedDate: (_, { date }) => date,
      }),
      assignDates: assign({
        dates: ({ month, year }) => {
          const dates = getDisplayDates(month, year, 42);
          return dates;
        },
      }),
      assignMonth: assign({
        month: (_, { month }) => month,
      }),
      goLastMonth: assign(({ year, month }) => {
        const lastMonth = getLastMonth(month);
        return {
          month: lastMonth,
          year: lastMonth > month ? year - 1 : year,
        };
      }),
      goNextMonth: assign(({ year, month }) => {
        const nextMonth = getNextMonth(month);
        return {
          month: nextMonth,
          year: nextMonth < month ? year + 1 : year,
        };
      }),
      goLastYear: assign({
        year: ({ year }) => year - 1,
      }),
      goNextYear: assign({
        year: ({ year }) => year + 1,
      }),
      assignYear: assign({
        year: (_, event) => event.year,
      }),
      assignYears: assign({
        years: ({ year }) => {
          const startYear = year - (year % 10);
          return range(startYear - 1, startYear + 10);
        },
      }),
      goLastDecade: assign({
        years: ({ years }) => {
          return range(years[0] - 10, years[0] + 1);
        },
      }),
      goNextDecade: assign({
        years: ({ years }) => {
          return range(
            years[years.length - 1] - 1,
            years[years.length - 1] + 10
          );
        },
      }),
      updateMonthAndYear: assign({
        month: ({ selectedDate, month }) =>
          selectedDate ? selectedDate.getMonth() : month,
        year: ({ selectedDate, year }) =>
          selectedDate ? selectedDate.getFullYear() : year,
      }),
    },
  }
);
export {
  datePickerMachine,
  State as DATE_PICKER_STATE,
  Event as DATE_PICKER_EVENT,
};

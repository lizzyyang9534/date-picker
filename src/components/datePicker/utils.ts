import * as R from 'ramda';

export const daysInMonth = (month: number, year: number) => {
  return new Date(year, getNextMonth(month), 0).getDate();
};
export const getLastMonth = (month: number) => {
  return month - 1 < 0 ? 11 : month - 1;
};
export const getNextMonth = (month: number) => {
  return month + 1 > 11 ? 0 : month + 1;
};
export const getLastMonthWithYear = (month: number, year: number) => {
  return month - 1 < 0
    ? { month: 11, year: year - 1 }
    : { month: month - 1, year };
};
export const getNextMonthWithYear = (month: number, year: number) => {
  return month + 1 > 11
    ? { month: 0, year: year + 1 }
    : { month: month + 1, year };
};

export const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const getDisplayDates = (
  month: number,
  year: number,
  dayCount: number
): Date[] => {
  const startDate = new Date(year, month, 1);
  const totalDaysInThisMonth = daysInMonth(month, year);
  const dayOfStartDate = startDate.getDay();

  const daysInThisMonth = R.range(1, totalDaysInThisMonth + 1).map(
    (d) => new Date(year, month, d)
  );

  const nextMonth = getNextMonthWithYear(month, year);
  const daysInNextMonth = R.range(
    1,
    dayCount - (dayOfStartDate + totalDaysInThisMonth) + 1
  ).map((d) => new Date(nextMonth.year, nextMonth.month, d));

  const displayDates = [...daysInThisMonth, ...daysInNextMonth];

  if (dayOfStartDate > 0) {
    const lastMonth = getLastMonthWithYear(month, year);
    const totalDaysInLastMonth = daysInMonth(lastMonth.month, lastMonth.year);
    const datesInLastMonth = R.range(
      totalDaysInLastMonth - dayOfStartDate + 1,
      totalDaysInLastMonth + 1
    ).map((d) => new Date(lastMonth.year, lastMonth.month, d));

    return [...datesInLastMonth, ...displayDates];
  }

  return displayDates;
};

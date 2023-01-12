import * as R from 'ramda';

export const daysInMonth = (month: number, year: number) => {
  return new Date(year, getNextMonth(month), 0).getDate();
};

export const getDisplayDates = (
  month: number,
  year: number,
  dayCount: number
): number[] => {
  const startDate = new Date(year, month, 1);
  const days = daysInMonth(month, year);
  const dayOfStartDate = startDate.getDay();

  const displayDays = [
    ...R.range(1, days + 1),
    ...R.range(1, dayCount - (dayOfStartDate + days) + 1),
  ];

  if (dayOfStartDate > 0) {
    const daysInLastMonth = daysInMonth(getLastMonth(month), year);

    return [
      ...R.range(daysInLastMonth - dayOfStartDate + 1, daysInLastMonth + 1),
      ...displayDays,
    ];
  }
  return displayDays;
};

export const getLastMonth = (month: number) => {
  return month - 1 < 0 ? 11 : month - 1;
};
export const getNextMonth = (month: number) => {
  return month + 1 > 11 ? 0 : month + 1;
};

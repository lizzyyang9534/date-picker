import { range } from '../../utils/list';
import { toIntWithMinDigits } from '../../utils/number';

// Date Utils
// These date utils can be replaced with any date utility library ex. date-fns
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
export const isSameDay = (dateLeft: Date, dateRight: Date) => {
  return (
    dateLeft.getDate() === dateRight.getDate() &&
    dateLeft.getMonth() === dateRight.getMonth() &&
    dateLeft.getFullYear() === dateRight.getFullYear()
  );
};
export const formatISODate = (date: Date) => {
  return `${date.getFullYear()}-${toIntWithMinDigits(
    date.getMonth() + 1,
    2
  )}-${toIntWithMinDigits(date.getDate(), 2)}`;
};
export const isValidISODateString = (dateString: string) => {
  if (!dateString) {
    return false;
  }
  return /\d{4}-[01]\d-[0-3]\d/.test(dateString);
};
// Date Utils end

const toDates =
  (year: number, month: number) =>
  (dates: number[]): Date[] =>
    dates.map((date) => new Date(year, month, date));
export const getDisplayDates = (
  month: number,
  year: number,
  dayCount: number
): Date[] => {
  const startDate = new Date(year, month, 1);
  const totalDaysInThisMonth = daysInMonth(month, year);
  const dayOfStartDate = startDate.getDay();

  const datesInThisMonth = toDates(year, month)(range(1, totalDaysInThisMonth));

  const nextMonth = getNextMonthWithYear(month, year);
  const datesInNextMonth = toDates(
    nextMonth.year,
    nextMonth.month
  )(range(1, dayCount - (dayOfStartDate + totalDaysInThisMonth)));

  const displayDates = datesInThisMonth.concat(datesInNextMonth);

  if (dayOfStartDate > 0) {
    const lastMonth = getLastMonthWithYear(month, year);
    const totalDaysInLastMonth = daysInMonth(lastMonth.month, lastMonth.year);
    const datesInLastMonth = toDates(
      lastMonth.year,
      lastMonth.month
    )(range(totalDaysInLastMonth - dayOfStartDate + 1, totalDaysInLastMonth));

    return datesInLastMonth.concat(displayDates);
  }

  return displayDates;
};

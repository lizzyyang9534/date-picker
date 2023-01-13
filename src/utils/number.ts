export const toIntWithMinDigits = (num: number, digits: number) =>
  num.toLocaleString('en-US', {
    minimumIntegerDigits: digits,
  });

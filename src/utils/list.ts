/**
 * @param from start number
 * @param to end number
 * @returns An array of numbers from `from` to `to`.
 * @example
 *     range(1, 3) => [1, 2, 3]
 *     range(3, 1) => [3, 2, 1]
 *     range(1, 1) => [1]
 */
export const range = (from: number, to: number): number[] => {
  const result: number[] = [];
  if (from <= to) {
    for (let index = from; index <= to; index++) {
      result.push(index);
    }
  } else {
    for (let index = from; index >= to; index--) {
      result.push(index);
    }
  }

  return result;
};

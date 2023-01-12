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

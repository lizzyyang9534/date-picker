export type DatePickerProps = {
  date: string | Date;
  onSelect: (date: Date) => void;
};

export type DateData = {
  date: Date;
  isInCurrentMonth: boolean;
};

export type DatePickerProps = {
  date: string | Date;
  onSelect: (date: Date) => void;
};
export type DatePickerInputProps = DatePickerProps & {
  renderInput?: (params: {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }) => React.ReactNode;
};

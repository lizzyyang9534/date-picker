import { SimpleGrid } from '@chakra-ui/react';
import { MONTHS } from '../constants';
import RoundButton from './RoundButton';

type MonthViewProps = {
  selectedMonth: number;
  onSelect: (month: number) => void;
};
const MonthView = ({ selectedMonth, onSelect }: MonthViewProps) => {
  return (
    <SimpleGrid columns={4} spacingX={1} spacingY={8} mt={4}>
      {MONTHS.map((m, monthIndex) => (
        <RoundButton
          key={m}
          isActive={monthIndex === selectedMonth}
          onClick={() => onSelect(monthIndex)}
        >
          {m.slice(0, 3)}
        </RoundButton>
      ))}
    </SimpleGrid>
  );
};
export default MonthView;
